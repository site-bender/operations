import { CommentChar } from "./comment_char.ts";
import { escapeForWithinString, getStringFromStrOrFunc } from "./utils/string_utils.ts";
const CHARS = {
    BACK_SLASH: "\\".charCodeAt(0),
    FORWARD_SLASH: "/".charCodeAt(0),
    NEW_LINE: "\n".charCodeAt(0),
    CARRIAGE_RETURN: "\r".charCodeAt(0),
    ASTERISK: "*".charCodeAt(0),
    DOUBLE_QUOTE: "\"".charCodeAt(0),
    SINGLE_QUOTE: "'".charCodeAt(0),
    BACK_TICK: "`".charCodeAt(0),
    OPEN_BRACE: "{".charCodeAt(0),
    CLOSE_BRACE: "}".charCodeAt(0),
    DOLLAR_SIGN: "$".charCodeAt(0),
    SPACE: " ".charCodeAt(0),
    TAB: "\t".charCodeAt(0),
};
const isCharToHandle = new Set([
    CHARS.BACK_SLASH,
    CHARS.FORWARD_SLASH,
    CHARS.NEW_LINE,
    CHARS.CARRIAGE_RETURN,
    CHARS.ASTERISK,
    CHARS.DOUBLE_QUOTE,
    CHARS.SINGLE_QUOTE,
    CHARS.BACK_TICK,
    CHARS.OPEN_BRACE,
    CHARS.CLOSE_BRACE,
]);
export default class CodeBlockWriter {
    _indentationText;
    _newLine;
    _useTabs;
    _quoteChar;
    _indentNumberOfSpaces;
    _currentIndentation = 0;
    _queuedIndentation;
    _queuedOnlyIfNotBlock;
    _length = 0;
    _newLineOnNextWrite = false;
    _currentCommentChar = undefined;
    _stringCharStack = [];
    _isInRegEx = false;
    _isOnFirstLineOfBlock = true;
    _texts = [];
    constructor(opts = {}) {
        this._newLine = opts.newLine || "\n";
        this._useTabs = opts.useTabs || false;
        this._indentNumberOfSpaces = opts.indentNumberOfSpaces || 4;
        this._indentationText = getIndentationText(this._useTabs, this._indentNumberOfSpaces);
        this._quoteChar = opts.useSingleQuote ? "'" : `"`;
    }
    getOptions() {
        return {
            indentNumberOfSpaces: this._indentNumberOfSpaces,
            newLine: this._newLine,
            useTabs: this._useTabs,
            useSingleQuote: this._quoteChar === "'",
        };
    }
    queueIndentationLevel(countOrText) {
        this._queuedIndentation = this._getIndentationLevelFromArg(countOrText);
        this._queuedOnlyIfNotBlock = undefined;
        return this;
    }
    hangingIndent(action) {
        return this._withResetIndentation(() => this.queueIndentationLevel(this.getIndentationLevel() + 1), action);
    }
    hangingIndentUnlessBlock(action) {
        return this._withResetIndentation(() => {
            this.queueIndentationLevel(this.getIndentationLevel() + 1);
            this._queuedOnlyIfNotBlock = true;
        }, action);
    }
    setIndentationLevel(countOrText) {
        this._currentIndentation = this._getIndentationLevelFromArg(countOrText);
        return this;
    }
    withIndentationLevel(countOrText, action) {
        return this._withResetIndentation(() => this.setIndentationLevel(countOrText), action);
    }
    _withResetIndentation(setStateAction, writeAction) {
        const previousState = this._getIndentationState();
        setStateAction();
        try {
            writeAction();
        }
        finally {
            this._setIndentationState(previousState);
        }
        return this;
    }
    getIndentationLevel() {
        return this._currentIndentation;
    }
    block(block) {
        this._newLineIfNewLineOnNextWrite();
        if (this.getLength() > 0 && !this.isLastNewLine()) {
            this.spaceIfLastNot();
        }
        this.inlineBlock(block);
        this._newLineOnNextWrite = true;
        return this;
    }
    inlineBlock(block) {
        this._newLineIfNewLineOnNextWrite();
        this.write("{");
        this._indentBlockInternal(block);
        this.newLineIfLastNot().write("}");
        return this;
    }
    indent(timesOrBlock = 1) {
        if (typeof timesOrBlock === "number") {
            this._newLineIfNewLineOnNextWrite();
            return this.write(this._indentationText.repeat(timesOrBlock));
        }
        else {
            this._indentBlockInternal(timesOrBlock);
            if (!this.isLastNewLine()) {
                this._newLineOnNextWrite = true;
            }
            return this;
        }
    }
    _indentBlockInternal(block) {
        if (this.getLastChar() != null) {
            this.newLineIfLastNot();
        }
        this._currentIndentation++;
        this._isOnFirstLineOfBlock = true;
        if (block != null) {
            block();
        }
        this._isOnFirstLineOfBlock = false;
        this._currentIndentation = Math.max(0, this._currentIndentation - 1);
    }
    conditionalWriteLine(condition, strOrFunc) {
        if (condition) {
            this.writeLine(getStringFromStrOrFunc(strOrFunc));
        }
        return this;
    }
    writeLine(text) {
        this._newLineIfNewLineOnNextWrite();
        if (this.getLastChar() != null) {
            this.newLineIfLastNot();
        }
        this._writeIndentingNewLines(text);
        this.newLine();
        return this;
    }
    newLineIfLastNot() {
        this._newLineIfNewLineOnNextWrite();
        if (!this.isLastNewLine()) {
            this.newLine();
        }
        return this;
    }
    blankLineIfLastNot() {
        if (!this.isLastBlankLine()) {
            this.blankLine();
        }
        return this;
    }
    conditionalBlankLine(condition) {
        if (condition) {
            this.blankLine();
        }
        return this;
    }
    blankLine() {
        return this.newLineIfLastNot().newLine();
    }
    conditionalNewLine(condition) {
        if (condition) {
            this.newLine();
        }
        return this;
    }
    newLine() {
        this._newLineOnNextWrite = false;
        this._baseWriteNewline();
        return this;
    }
    quote(text) {
        this._newLineIfNewLineOnNextWrite();
        this._writeIndentingNewLines(text == null ? this._quoteChar : this._quoteChar + escapeForWithinString(text, this._quoteChar) + this._quoteChar);
        return this;
    }
    spaceIfLastNot() {
        this._newLineIfNewLineOnNextWrite();
        if (!this.isLastSpace()) {
            this._writeIndentingNewLines(" ");
        }
        return this;
    }
    space(times = 1) {
        this._newLineIfNewLineOnNextWrite();
        this._writeIndentingNewLines(" ".repeat(times));
        return this;
    }
    tabIfLastNot() {
        this._newLineIfNewLineOnNextWrite();
        if (!this.isLastTab()) {
            this._writeIndentingNewLines("\t");
        }
        return this;
    }
    tab(times = 1) {
        this._newLineIfNewLineOnNextWrite();
        this._writeIndentingNewLines("\t".repeat(times));
        return this;
    }
    conditionalWrite(condition, textOrFunc) {
        if (condition) {
            this.write(getStringFromStrOrFunc(textOrFunc));
        }
        return this;
    }
    write(text) {
        this._newLineIfNewLineOnNextWrite();
        this._writeIndentingNewLines(text);
        return this;
    }
    closeComment() {
        const commentChar = this._currentCommentChar;
        switch (commentChar) {
            case CommentChar.Line:
                this.newLine();
                break;
            case CommentChar.Star:
                if (!this.isLastNewLine()) {
                    this.spaceIfLastNot();
                }
                this.write("*/");
                break;
            default: {
                const _assertUndefined = commentChar;
                break;
            }
        }
        return this;
    }
    unsafeInsert(pos, text) {
        const textLength = this._length;
        const texts = this._texts;
        verifyInput();
        if (pos === textLength) {
            return this.write(text);
        }
        updateInternalArray();
        this._length += text.length;
        return this;
        function verifyInput() {
            if (pos < 0) {
                throw new Error(`Provided position of '${pos}' was less than zero.`);
            }
            if (pos > textLength) {
                throw new Error(`Provided position of '${pos}' was greater than the text length of '${textLength}'.`);
            }
        }
        function updateInternalArray() {
            const { index, localIndex } = getArrayIndexAndLocalIndex();
            if (localIndex === 0) {
                texts.splice(index, 0, text);
            }
            else if (localIndex === texts[index].length) {
                texts.splice(index + 1, 0, text);
            }
            else {
                const textItem = texts[index];
                const startText = textItem.substring(0, localIndex);
                const endText = textItem.substring(localIndex);
                texts.splice(index, 1, startText, text, endText);
            }
        }
        function getArrayIndexAndLocalIndex() {
            if (pos < textLength / 2) {
                let endPos = 0;
                for (let i = 0; i < texts.length; i++) {
                    const textItem = texts[i];
                    const startPos = endPos;
                    endPos += textItem.length;
                    if (endPos >= pos) {
                        return { index: i, localIndex: pos - startPos };
                    }
                }
            }
            else {
                let startPos = textLength;
                for (let i = texts.length - 1; i >= 0; i--) {
                    const textItem = texts[i];
                    startPos -= textItem.length;
                    if (startPos <= pos) {
                        return { index: i, localIndex: pos - startPos };
                    }
                }
            }
            throw new Error("Unhandled situation inserting. This should never happen.");
        }
    }
    getLength() {
        return this._length;
    }
    isInComment() {
        return this._currentCommentChar !== undefined;
    }
    isAtStartOfFirstLineOfBlock() {
        return this.isOnFirstLineOfBlock() && (this.isLastNewLine() || this.getLastChar() == null);
    }
    isOnFirstLineOfBlock() {
        return this._isOnFirstLineOfBlock;
    }
    isInString() {
        return this._stringCharStack.length > 0 && this._stringCharStack[this._stringCharStack.length - 1] !== CHARS.OPEN_BRACE;
    }
    isLastNewLine() {
        const lastChar = this.getLastChar();
        return lastChar === "\n" || lastChar === "\r";
    }
    isLastBlankLine() {
        let foundCount = 0;
        for (let i = this._texts.length - 1; i >= 0; i--) {
            const currentText = this._texts[i];
            for (let j = currentText.length - 1; j >= 0; j--) {
                const currentChar = currentText.charCodeAt(j);
                if (currentChar === CHARS.NEW_LINE) {
                    foundCount++;
                    if (foundCount === 2) {
                        return true;
                    }
                }
                else if (currentChar !== CHARS.CARRIAGE_RETURN) {
                    return false;
                }
            }
        }
        return false;
    }
    isLastSpace() {
        return this.getLastChar() === " ";
    }
    isLastTab() {
        return this.getLastChar() === "\t";
    }
    getLastChar() {
        const charCode = this._getLastCharCodeWithOffset(0);
        return charCode == null ? undefined : String.fromCharCode(charCode);
    }
    endsWith(text) {
        const length = this._length;
        return this.iterateLastCharCodes((charCode, index) => {
            const offset = length - index;
            const textIndex = text.length - offset;
            if (text.charCodeAt(textIndex) !== charCode) {
                return false;
            }
            return textIndex === 0 ? true : undefined;
        }) || false;
    }
    iterateLastChars(action) {
        return this.iterateLastCharCodes((charCode, index) => action(String.fromCharCode(charCode), index));
    }
    iterateLastCharCodes(action) {
        let index = this._length;
        for (let i = this._texts.length - 1; i >= 0; i--) {
            const currentText = this._texts[i];
            for (let j = currentText.length - 1; j >= 0; j--) {
                index--;
                const result = action(currentText.charCodeAt(j), index);
                if (result != null) {
                    return result;
                }
            }
        }
        return undefined;
    }
    toString() {
        if (this._texts.length > 1) {
            const text = this._texts.join("");
            this._texts.length = 0;
            this._texts.push(text);
        }
        return this._texts[0] || "";
    }
    static _newLineRegEx = /\r?\n/;
    _writeIndentingNewLines(text) {
        text = text || "";
        if (text.length === 0) {
            writeIndividual(this, "");
            return;
        }
        const items = text.split(CodeBlockWriter._newLineRegEx);
        items.forEach((s, i) => {
            if (i > 0) {
                this._baseWriteNewline();
            }
            if (s.length === 0) {
                return;
            }
            writeIndividual(this, s);
        });
        function writeIndividual(writer, s) {
            if (!writer.isInString()) {
                const isAtStartOfLine = writer.isLastNewLine() || writer.getLastChar() == null;
                if (isAtStartOfLine) {
                    writer._writeIndentation();
                }
            }
            writer._updateInternalState(s);
            writer._internalWrite(s);
        }
    }
    _baseWriteNewline() {
        if (this._currentCommentChar === CommentChar.Line) {
            this._currentCommentChar = undefined;
        }
        const lastStringCharOnStack = this._stringCharStack[this._stringCharStack.length - 1];
        if ((lastStringCharOnStack === CHARS.DOUBLE_QUOTE || lastStringCharOnStack === CHARS.SINGLE_QUOTE) && this._getLastCharCodeWithOffset(0) !== CHARS.BACK_SLASH) {
            this._stringCharStack.pop();
        }
        this._internalWrite(this._newLine);
        this._isOnFirstLineOfBlock = false;
        this._dequeueQueuedIndentation();
    }
    _dequeueQueuedIndentation() {
        if (this._queuedIndentation == null) {
            return;
        }
        if (this._queuedOnlyIfNotBlock && wasLastBlock(this)) {
            this._queuedIndentation = undefined;
            this._queuedOnlyIfNotBlock = undefined;
        }
        else {
            this._currentIndentation = this._queuedIndentation;
            this._queuedIndentation = undefined;
        }
        function wasLastBlock(writer) {
            let foundNewLine = false;
            return writer.iterateLastCharCodes(charCode => {
                switch (charCode) {
                    case CHARS.NEW_LINE:
                        if (foundNewLine) {
                            return false;
                        }
                        else {
                            foundNewLine = true;
                        }
                        break;
                    case CHARS.CARRIAGE_RETURN:
                        return undefined;
                    case CHARS.OPEN_BRACE:
                        return true;
                    default:
                        return false;
                }
            });
        }
    }
    _updateInternalState(str) {
        for (let i = 0; i < str.length; i++) {
            const currentChar = str.charCodeAt(i);
            if (!isCharToHandle.has(currentChar)) {
                continue;
            }
            const pastChar = i === 0 ? this._getLastCharCodeWithOffset(0) : str.charCodeAt(i - 1);
            const pastPastChar = i === 0 ? this._getLastCharCodeWithOffset(1) : i === 1 ? this._getLastCharCodeWithOffset(0) : str.charCodeAt(i - 2);
            if (this._isInRegEx) {
                if (pastChar === CHARS.FORWARD_SLASH && pastPastChar !== CHARS.BACK_SLASH || pastChar === CHARS.NEW_LINE) {
                    this._isInRegEx = false;
                }
                else {
                    continue;
                }
            }
            else if (!this.isInString() && !this.isInComment() && isRegExStart(currentChar, pastChar, pastPastChar)) {
                this._isInRegEx = true;
                continue;
            }
            if (this._currentCommentChar == null && pastChar === CHARS.FORWARD_SLASH && currentChar === CHARS.FORWARD_SLASH) {
                this._currentCommentChar = CommentChar.Line;
            }
            else if (this._currentCommentChar == null && pastChar === CHARS.FORWARD_SLASH && currentChar === CHARS.ASTERISK) {
                this._currentCommentChar = CommentChar.Star;
            }
            else if (this._currentCommentChar === CommentChar.Star && pastChar === CHARS.ASTERISK && currentChar === CHARS.FORWARD_SLASH) {
                this._currentCommentChar = undefined;
            }
            if (this.isInComment()) {
                continue;
            }
            const lastStringCharOnStack = this._stringCharStack.length === 0 ? undefined : this._stringCharStack[this._stringCharStack.length - 1];
            if (pastChar !== CHARS.BACK_SLASH && (currentChar === CHARS.DOUBLE_QUOTE || currentChar === CHARS.SINGLE_QUOTE || currentChar === CHARS.BACK_TICK)) {
                if (lastStringCharOnStack === currentChar) {
                    this._stringCharStack.pop();
                }
                else if (lastStringCharOnStack === CHARS.OPEN_BRACE || lastStringCharOnStack === undefined) {
                    this._stringCharStack.push(currentChar);
                }
            }
            else if (pastPastChar !== CHARS.BACK_SLASH && pastChar === CHARS.DOLLAR_SIGN && currentChar === CHARS.OPEN_BRACE && lastStringCharOnStack === CHARS.BACK_TICK) {
                this._stringCharStack.push(currentChar);
            }
            else if (currentChar === CHARS.CLOSE_BRACE && lastStringCharOnStack === CHARS.OPEN_BRACE) {
                this._stringCharStack.pop();
            }
        }
    }
    _getLastCharCodeWithOffset(offset) {
        if (offset >= this._length || offset < 0) {
            return undefined;
        }
        for (let i = this._texts.length - 1; i >= 0; i--) {
            const currentText = this._texts[i];
            if (offset >= currentText.length) {
                offset -= currentText.length;
            }
            else {
                return currentText.charCodeAt(currentText.length - 1 - offset);
            }
        }
        return undefined;
    }
    _writeIndentation() {
        const flooredIndentation = Math.floor(this._currentIndentation);
        this._internalWrite(this._indentationText.repeat(flooredIndentation));
        const overflow = this._currentIndentation - flooredIndentation;
        if (this._useTabs) {
            if (overflow > 0.5) {
                this._internalWrite(this._indentationText);
            }
        }
        else {
            const portion = Math.round(this._indentationText.length * overflow);
            let text = "";
            for (let i = 0; i < portion; i++) {
                text += this._indentationText[i];
            }
            this._internalWrite(text);
        }
    }
    _newLineIfNewLineOnNextWrite() {
        if (!this._newLineOnNextWrite) {
            return;
        }
        this._newLineOnNextWrite = false;
        this.newLine();
    }
    _internalWrite(text) {
        if (text.length === 0) {
            return;
        }
        this._texts.push(text);
        this._length += text.length;
    }
    static _spacesOrTabsRegEx = /^[ \t]*$/;
    _getIndentationLevelFromArg(countOrText) {
        if (typeof countOrText === "number") {
            if (countOrText < 0) {
                throw new Error("Passed in indentation level should be greater than or equal to 0.");
            }
            return countOrText;
        }
        else if (typeof countOrText === "string") {
            if (!CodeBlockWriter._spacesOrTabsRegEx.test(countOrText)) {
                throw new Error("Provided string must be empty or only contain spaces or tabs.");
            }
            const { spacesCount, tabsCount } = getSpacesAndTabsCount(countOrText);
            return tabsCount + spacesCount / this._indentNumberOfSpaces;
        }
        else {
            throw new Error("Argument provided must be a string or number.");
        }
    }
    _setIndentationState(state) {
        this._currentIndentation = state.current;
        this._queuedIndentation = state.queued;
        this._queuedOnlyIfNotBlock = state.queuedOnlyIfNotBlock;
    }
    _getIndentationState() {
        return {
            current: this._currentIndentation,
            queued: this._queuedIndentation,
            queuedOnlyIfNotBlock: this._queuedOnlyIfNotBlock,
        };
    }
}
function isRegExStart(currentChar, pastChar, pastPastChar) {
    return pastChar === CHARS.FORWARD_SLASH
        && currentChar !== CHARS.FORWARD_SLASH
        && currentChar !== CHARS.ASTERISK
        && pastPastChar !== CHARS.ASTERISK
        && pastPastChar !== CHARS.FORWARD_SLASH;
}
function getIndentationText(useTabs, numberSpaces) {
    if (useTabs) {
        return "\t";
    }
    return Array(numberSpaces + 1).join(" ");
}
function getSpacesAndTabsCount(str) {
    let spacesCount = 0;
    let tabsCount = 0;
    for (let i = 0; i < str.length; i++) {
        const charCode = str.charCodeAt(i);
        if (charCode === CHARS.SPACE) {
            spacesCount++;
        }
        else if (charCode === CHARS.TAB) {
            tabsCount++;
        }
    }
    return { spacesCount, tabsCount };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQTZCeEYsTUFBTSxLQUFLLEdBQUc7SUFDWixVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDOUIsYUFBYSxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQ2hDLFFBQVEsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUM1QixlQUFlLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDbkMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQzNCLFlBQVksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUNoQyxZQUFZLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDL0IsU0FBUyxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQzVCLFVBQVUsRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUM3QixXQUFXLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDOUIsV0FBVyxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQzlCLEtBQUssRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUN4QixHQUFHLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Q0FDeEIsQ0FBQztBQUNGLE1BQU0sY0FBYyxHQUFHLElBQUksR0FBRyxDQUFTO0lBQ3JDLEtBQUssQ0FBQyxVQUFVO0lBQ2hCLEtBQUssQ0FBQyxhQUFhO0lBQ25C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QVc7SUFDeEMsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDO0lBQ3BCLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQztJQUVsQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNuQyxNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25DLElBQUksUUFBUSxLQUFLLEtBQUssQ0FBQyxLQUFLLEVBQUU7WUFDNUIsV0FBVyxFQUFFLENBQUM7U0FDZjthQUFNLElBQUksUUFBUSxLQUFLLEtBQUssQ0FBQyxHQUFHLEVBQUU7WUFDakMsU0FBUyxFQUFFLENBQUM7U0FDYjtLQUNGO0lBRUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsQ0FBQztBQUNwQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbWVudENoYXIgfSBmcm9tIFwiLi9jb21tZW50X2NoYXIudHNcIjtcbmltcG9ydCB7IGVzY2FwZUZvcldpdGhpblN0cmluZywgZ2V0U3RyaW5nRnJvbVN0ck9yRnVuYyB9IGZyb20gXCIuL3V0aWxzL3N0cmluZ191dGlscy50c1wiO1xuXG4vKipcbiAqIE9wdGlvbnMgZm9yIHRoZSB3cml0ZXIuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBOZXdsaW5lIGNoYXJhY3Rlci5cbiAgICogQHJlbWFya3MgRGVmYXVsdHMgdG8gXFxuLlxuICAgKi9cbiAgbmV3TGluZTogXCJcXG5cIiB8IFwiXFxyXFxuXCI7XG4gIC8qKlxuICAgKiBOdW1iZXIgb2Ygc3BhY2VzIHRvIGluZGVudCB3aGVuIGB1c2VUYWJzYCBpcyBmYWxzZS5cbiAgICogQHJlbWFya3MgRGVmYXVsdHMgdG8gNC5cbiAgICovXG4gIGluZGVudE51bWJlck9mU3BhY2VzOiBudW1iZXI7XG4gIC8qKlxuICAgKiBXaGV0aGVyIHRvIHVzZSB0YWJzICh0cnVlKSBvciBzcGFjZXMgKGZhbHNlKS5cbiAgICogQHJlbWFya3MgRGVmYXVsdHMgdG8gZmFsc2UuXG4gICAqL1xuICB1c2VUYWJzOiBib29sZWFuO1xuICAvKipcbiAgICogV2hldGhlciB0byB1c2UgYSBzaW5nbGUgcXVvdGUgKHRydWUpIG9yIGRvdWJsZSBxdW90ZSAoZmFsc2UpLlxuICAgKiBAcmVtYXJrcyBEZWZhdWx0cyB0byBmYWxzZS5cbiAgICovXG4gIHVzZVNpbmdsZVF1b3RlOiBib29sZWFuO1xufVxuXG4vLyBVc2luZyB0aGUgY2hhciBjb2RlcyBpcyBhIHBlcmZvcm1hbmNlIGltcHJvdmVtZW50IChhYm91dCA1LjUlIGZhc3RlciB3aGVuIHdyaXRpbmcgYmVjYXVzZSBpdCBlbGltaW5hdGVzIGFkZGl0aW9uYWwgc3RyaW5nIGFsbG9jYXRpb25zKS5cbmNvbnN0IENIQVJTID0ge1xuICBCQUNLX1NMQVNIOiBcIlxcXFxcIi5jaGFyQ29kZUF0KDApLFxuICBGT1JXQVJEX1NMQVNIOiBcIi9cIi5jaGFyQ29kZUF0KDApLFxuICBORVdfTElORTogXCJcXG5cIi5jaGFyQ29kZUF0KDApLFxuICBDQVJSSUFHRV9SRVRVUk46IFwiXFxyXCIuY2hhckNvZGVBdCgwKSxcbiAgQVNURVJJU0s6IFwiKlwiLmNoYXJDb2RlQXQoMCksXG4gIERPVUJMRV9RVU9URTogXCJcXFwiXCIuY2hhckNvZGVBdCgwKSxcbiAgU0lOR0xFX1FVT1RFOiBcIidcIi5jaGFyQ29kZUF0KDApLFxuICBCQUNLX1RJQ0s6IFwiYFwiLmNoYXJDb2RlQXQoMCksXG4gIE9QRU5fQlJBQ0U6IFwie1wiLmNoYXJDb2RlQXQoMCksXG4gIENMT1NFX0JSQUNFOiBcIn1cIi5jaGFyQ29kZUF0KDApLFxuICBET0xMQVJfU0lHTjogXCIkXCIuY2hhckNvZGVBdCgwKSxcbiAgU1BBQ0U6IFwiIFwiLmNoYXJDb2RlQXQoMCksXG4gIFRBQjogXCJcXHRcIi5jaGFyQ29kZUF0KDApLFxufTtcbmNvbnN0IGlzQ2hhclRvSGFuZGxlID0gbmV3IFNldDxudW1iZXI+KFtcbiAgQ0hBUlMuQkFDS19TTEFTSCxcbiAgQ0hBUlMuRk9SV0FSRF9TTEFTSCxcbiAgQ0hBUlMuTkVXX0xJTkUsXG4gIENIQVJTLkNBUlJJQUdFX1JFVFVSTixcbiAgQ0hBUlMuQVNURVJJU0ssXG4gIENIQVJTLkRPVUJMRV9RVU9URSxcbiAgQ0hBUlMuU0lOR0xFX1FVT1RFLFxuICBDSEFSUy5CQUNLX1RJQ0ssXG4gIENIQVJTLk9QRU5fQlJBQ0UsXG4gIENIQVJTLkNMT1NFX0JSQUNFLFxuXSk7XG5cbi8qKlxuICogQ29kZSB3cml0ZXIgdGhhdCBhc3Npc3RzIHdpdGggZm9ybWF0dGluZyBhbmQgdmlzdWFsaXppbmcgYmxvY2tzIG9mIEphdmFTY3JpcHQgb3IgVHlwZVNjcmlwdCBjb2RlLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2RlQmxvY2tXcml0ZXIge1xuICAvKiogQGludGVybmFsICovXG4gIHByaXZhdGUgcmVhZG9ubHkgX2luZGVudGF0aW9uVGV4dDogc3RyaW5nO1xuICAvKiogQGludGVybmFsICovXG4gIHByaXZhdGUgcmVhZG9ubHkgX25ld0xpbmU6IFwiXFxuXCIgfCBcIlxcclxcblwiO1xuICAvKiogQGludGVybmFsICovXG4gIHByaXZhdGUgcmVhZG9ubHkgX3VzZVRhYnM6IGJvb2xlYW47XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcHJpdmF0ZSByZWFkb25seSBfcXVvdGVDaGFyOiBzdHJpbmc7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcHJpdmF0ZSByZWFkb25seSBfaW5kZW50TnVtYmVyT2ZTcGFjZXM6IG51bWJlcjtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBwcml2YXRlIF9jdXJyZW50SW5kZW50YXRpb24gPSAwO1xuICAvKiogQGludGVybmFsICovXG4gIHByaXZhdGUgX3F1ZXVlZEluZGVudGF0aW9uOiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcHJpdmF0ZSBfcXVldWVkT25seUlmTm90QmxvY2s6IHRydWUgfCB1bmRlZmluZWQ7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcHJpdmF0ZSBfbGVuZ3RoID0gMDtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBwcml2YXRlIF9uZXdMaW5lT25OZXh0V3JpdGUgPSBmYWxzZTtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBwcml2YXRlIF9jdXJyZW50Q29tbWVudENoYXI6IENvbW1lbnRDaGFyIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICAvKiogQGludGVybmFsICovXG4gIHByaXZhdGUgX3N0cmluZ0NoYXJTdGFjazogbnVtYmVyW10gPSBbXTtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBwcml2YXRlIF9pc0luUmVnRXggPSBmYWxzZTtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBwcml2YXRlIF9pc09uRmlyc3RMaW5lT2ZCbG9jayA9IHRydWU7XG4gIC8vIEFuIGFycmF5IG9mIHN0cmluZ3MgaXMgdXNlZCByYXRoZXIgdGhhbiBhIHNpbmdsZSBzdHJpbmcgYmVjYXVzZSBpdCB3YXNcbiAgLy8gZm91bmQgdG8gYmUgfjExeCBmYXN0ZXIgd2hlbiBwcmludGluZyBhIDEwSyBsaW5lIGZpbGUgKH4xMXMgdG8gfjFzKS5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBwcml2YXRlIF90ZXh0czogc3RyaW5nW10gPSBbXTtcblxuICAvKipcbiAgICogQ29uc3RydWN0b3IuXG4gICAqIEBwYXJhbSBvcHRzIC0gT3B0aW9ucyBmb3IgdGhlIHdyaXRlci5cbiAgICovXG4gIGNvbnN0cnVjdG9yKG9wdHM6IFBhcnRpYWw8T3B0aW9ucz4gPSB7fSkge1xuICAgIHRoaXMuX25ld0xpbmUgPSBvcHRzLm5ld0xpbmUgfHwgXCJcXG5cIjtcbiAgICB0aGlzLl91c2VUYWJzID0gb3B0cy51c2VUYWJzIHx8IGZhbHNlO1xuICAgIHRoaXMuX2luZGVudE51bWJlck9mU3BhY2VzID0gb3B0cy5pbmRlbnROdW1iZXJPZlNwYWNlcyB8fCA0O1xuICAgIHRoaXMuX2luZGVudGF0aW9uVGV4dCA9IGdldEluZGVudGF0aW9uVGV4dCh0aGlzLl91c2VUYWJzLCB0aGlzLl9pbmRlbnROdW1iZXJPZlNwYWNlcyk7XG4gICAgdGhpcy5fcXVvdGVDaGFyID0gb3B0cy51c2VTaW5nbGVRdW90ZSA/IFwiJ1wiIDogYFwiYDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBvcHRpb25zLlxuICAgKi9cbiAgZ2V0T3B0aW9ucygpOiBPcHRpb25zIHtcbiAgICByZXR1cm4ge1xuICAgICAgaW5kZW50TnVtYmVyT2ZTcGFjZXM6IHRoaXMuX2luZGVudE51bWJlck9mU3BhY2VzLFxuICAgICAgbmV3TGluZTogdGhpcy5fbmV3TGluZSxcbiAgICAgIHVzZVRhYnM6IHRoaXMuX3VzZVRhYnMsXG4gICAgICB1c2VTaW5nbGVRdW90ZTogdGhpcy5fcXVvdGVDaGFyID09PSBcIidcIixcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFF1ZXVlcyB0aGUgaW5kZW50YXRpb24gbGV2ZWwgZm9yIHRoZSBuZXh0IGxpbmVzIHdyaXR0ZW4uXG4gICAqIEBwYXJhbSBpbmRlbnRhdGlvbkxldmVsIC0gSW5kZW50YXRpb24gbGV2ZWwgdG8gcXVldWUuXG4gICAqL1xuICBxdWV1ZUluZGVudGF0aW9uTGV2ZWwoaW5kZW50YXRpb25MZXZlbDogbnVtYmVyKTogdGhpcztcbiAgLyoqXG4gICAqIFF1ZXVlcyB0aGUgaW5kZW50YXRpb24gbGV2ZWwgZm9yIHRoZSBuZXh0IGxpbmVzIHdyaXR0ZW4gdXNpbmcgdGhlIHByb3ZpZGVkIGluZGVudGF0aW9uIHRleHQuXG4gICAqIEBwYXJhbSB3aGl0ZXNwYWNlVGV4dCAtIEdldHMgdGhlIGluZGVudGF0aW9uIGxldmVsIGZyb20gdGhlIGluZGVudGF0aW9uIHRleHQuXG4gICAqL1xuICBxdWV1ZUluZGVudGF0aW9uTGV2ZWwod2hpdGVzcGFjZVRleHQ6IHN0cmluZyk6IHRoaXM7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcXVldWVJbmRlbnRhdGlvbkxldmVsKGNvdW50T3JUZXh0OiBzdHJpbmcgfCBudW1iZXIpOiB0aGlzO1xuICBxdWV1ZUluZGVudGF0aW9uTGV2ZWwoY291bnRPclRleHQ6IHN0cmluZyB8IG51bWJlcikge1xuICAgIHRoaXMuX3F1ZXVlZEluZGVudGF0aW9uID0gdGhpcy5fZ2V0SW5kZW50YXRpb25MZXZlbEZyb21BcmcoY291bnRPclRleHQpO1xuICAgIHRoaXMuX3F1ZXVlZE9ubHlJZk5vdEJsb2NrID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFdyaXRlcyB0aGUgdGV4dCB3aXRoaW4gdGhlIHByb3ZpZGVkIGFjdGlvbiB3aXRoIGhhbmdpbmcgaW5kZW50YXRpb24uXG4gICAqIEBwYXJhbSBhY3Rpb24gLSBBY3Rpb24gdG8gcGVyZm9ybSB3aXRoIGhhbmdpbmcgaW5kZW50YXRpb24uXG4gICAqL1xuICBoYW5naW5nSW5kZW50KGFjdGlvbjogKCkgPT4gdm9pZCk6IHRoaXMge1xuICAgIHJldHVybiB0aGlzLl93aXRoUmVzZXRJbmRlbnRhdGlvbigoKSA9PiB0aGlzLnF1ZXVlSW5kZW50YXRpb25MZXZlbCh0aGlzLmdldEluZGVudGF0aW9uTGV2ZWwoKSArIDEpLCBhY3Rpb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIFdyaXRlcyB0aGUgdGV4dCB3aXRoaW4gdGhlIHByb3ZpZGVkIGFjdGlvbiB3aXRoIGhhbmdpbmcgaW5kZW50YXRpb24gdW5sZXNzIHdyaXRpbmcgYSBibG9jay5cbiAgICogQHBhcmFtIGFjdGlvbiAtIEFjdGlvbiB0byBwZXJmb3JtIHdpdGggaGFuZ2luZyBpbmRlbnRhdGlvbiB1bmxlc3MgYSBibG9jayBpcyB3cml0dGVuLlxuICAgKi9cbiAgaGFuZ2luZ0luZGVudFVubGVzc0Jsb2NrKGFjdGlvbjogKCkgPT4gdm9pZCk6IHRoaXMge1xuICAgIHJldHVybiB0aGlzLl93aXRoUmVzZXRJbmRlbnRhdGlvbigoKSA9PiB7XG4gICAgICB0aGlzLnF1ZXVlSW5kZW50YXRpb25MZXZlbCh0aGlzLmdldEluZGVudGF0aW9uTGV2ZWwoKSArIDEpO1xuICAgICAgdGhpcy5fcXVldWVkT25seUlmTm90QmxvY2sgPSB0cnVlO1xuICAgIH0sIGFjdGlvbik7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgY3VycmVudCBpbmRlbnRhdGlvbiBsZXZlbC5cbiAgICogQHBhcmFtIGluZGVudGF0aW9uTGV2ZWwgLSBJbmRlbnRhdGlvbiBsZXZlbCB0byBiZSBhdC5cbiAgICovXG4gIHNldEluZGVudGF0aW9uTGV2ZWwoaW5kZW50YXRpb25MZXZlbDogbnVtYmVyKTogdGhpcztcbiAgLyoqXG4gICAqIFNldHMgdGhlIGN1cnJlbnQgaW5kZW50YXRpb24gdXNpbmcgdGhlIHByb3ZpZGVkIGluZGVudGF0aW9uIHRleHQuXG4gICAqIEBwYXJhbSB3aGl0ZXNwYWNlVGV4dCAtIEdldHMgdGhlIGluZGVudGF0aW9uIGxldmVsIGZyb20gdGhlIGluZGVudGF0aW9uIHRleHQuXG4gICAqL1xuICBzZXRJbmRlbnRhdGlvbkxldmVsKHdoaXRlc3BhY2VUZXh0OiBzdHJpbmcpOiB0aGlzO1xuICAvKiogQGludGVybmFsICovXG4gIHNldEluZGVudGF0aW9uTGV2ZWwoY291bnRPclRleHQ6IHN0cmluZyB8IG51bWJlcik6IHRoaXM7XG4gIHNldEluZGVudGF0aW9uTGV2ZWwoY291bnRPclRleHQ6IHN0cmluZyB8IG51bWJlcikge1xuICAgIHRoaXMuX2N1cnJlbnRJbmRlbnRhdGlvbiA9IHRoaXMuX2dldEluZGVudGF0aW9uTGV2ZWxGcm9tQXJnKGNvdW50T3JUZXh0KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBpbmRlbnRhdGlvbiBsZXZlbCB3aXRoaW4gdGhlIHByb3ZpZGVkIGFjdGlvbiBhbmQgcmVzdG9yZXMgdGhlIHdyaXRlcidzIGluZGVudGF0aW9uXG4gICAqIHN0YXRlIGFmdGVyd2FyZHMuXG4gICAqIEByZW1hcmtzIFJlc3RvcmVzIHRoZSB3cml0ZXIncyBzdGF0ZSBhZnRlciB0aGUgYWN0aW9uLlxuICAgKiBAcGFyYW0gaW5kZW50YXRpb25MZXZlbCAtIEluZGVudGF0aW9uIGxldmVsIHRvIHNldC5cbiAgICogQHBhcmFtIGFjdGlvbiAtIEFjdGlvbiB0byBwZXJmb3JtIHdpdGggdGhlIGluZGVudGF0aW9uLlxuICAgKi9cbiAgd2l0aEluZGVudGF0aW9uTGV2ZWwoaW5kZW50YXRpb25MZXZlbDogbnVtYmVyLCBhY3Rpb246ICgpID0+IHZvaWQpOiB0aGlzO1xuICAvKipcbiAgICogU2V0cyB0aGUgaW5kZW50YXRpb24gbGV2ZWwgd2l0aCB0aGUgcHJvdmlkZWQgaW5kZW50YXRpb24gdGV4dCB3aXRoaW4gdGhlIHByb3ZpZGVkIGFjdGlvblxuICAgKiBhbmQgcmVzdG9yZXMgdGhlIHdyaXRlcidzIGluZGVudGF0aW9uIHN0YXRlIGFmdGVyd2FyZHMuXG4gICAqIEBwYXJhbSB3aGl0ZXNwYWNlVGV4dCAtIEdldHMgdGhlIGluZGVudGF0aW9uIGxldmVsIGZyb20gdGhlIGluZGVudGF0aW9uIHRleHQuXG4gICAqIEBwYXJhbSBhY3Rpb24gLSBBY3Rpb24gdG8gcGVyZm9ybSB3aXRoIHRoZSBpbmRlbnRhdGlvbi5cbiAgICovXG4gIHdpdGhJbmRlbnRhdGlvbkxldmVsKHdoaXRlc3BhY2VUZXh0OiBzdHJpbmcsIGFjdGlvbjogKCkgPT4gdm9pZCk6IHRoaXM7XG4gIHdpdGhJbmRlbnRhdGlvbkxldmVsKGNvdW50T3JUZXh0OiBzdHJpbmcgfCBudW1iZXIsIGFjdGlvbjogKCkgPT4gdm9pZCkge1xuICAgIHJldHVybiB0aGlzLl93aXRoUmVzZXRJbmRlbnRhdGlvbigoKSA9PiB0aGlzLnNldEluZGVudGF0aW9uTGV2ZWwoY291bnRPclRleHQpLCBhY3Rpb24pO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBwcml2YXRlIF93aXRoUmVzZXRJbmRlbnRhdGlvbihzZXRTdGF0ZUFjdGlvbjogKCkgPT4gdm9pZCwgd3JpdGVBY3Rpb246ICgpID0+IHZvaWQpIHtcbiAgICBjb25zdCBwcmV2aW91c1N0YXRlID0gdGhpcy5fZ2V0SW5kZW50YXRpb25TdGF0ZSgpO1xuICAgIHNldFN0YXRlQWN0aW9uKCk7XG4gICAgdHJ5IHtcbiAgICAgIHdyaXRlQWN0aW9uKCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRoaXMuX3NldEluZGVudGF0aW9uU3RhdGUocHJldmlvdXNTdGF0ZSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGN1cnJlbnQgaW5kZW50YXRpb24gbGV2ZWwuXG4gICAqL1xuICBnZXRJbmRlbnRhdGlvbkxldmVsKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRJbmRlbnRhdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBXcml0ZXMgYSBibG9jayB1c2luZyBicmFjZXMuXG4gICAqIEBwYXJhbSBibG9jayAtIFdyaXRlIHVzaW5nIHRoZSB3cml0ZXIgd2l0aGluIHRoaXMgYmxvY2suXG4gICAqL1xuICBibG9jayhibG9jaz86ICgpID0+IHZvaWQpOiB0aGlzIHtcbiAgICB0aGlzLl9uZXdMaW5lSWZOZXdMaW5lT25OZXh0V3JpdGUoKTtcbiAgICBpZiAodGhpcy5nZXRMZW5ndGgoKSA+IDAgJiYgIXRoaXMuaXNMYXN0TmV3TGluZSgpKSB7XG4gICAgICB0aGlzLnNwYWNlSWZMYXN0Tm90KCk7XG4gICAgfVxuICAgIHRoaXMuaW5saW5lQmxvY2soYmxvY2spO1xuICAgIHRoaXMuX25ld0xpbmVPbk5leHRXcml0ZSA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogV3JpdGVzIGFuIGlubGluZSBibG9jayB3aXRoIGJyYWNlcy5cbiAgICogQHBhcmFtIGJsb2NrIC0gV3JpdGUgdXNpbmcgdGhlIHdyaXRlciB3aXRoaW4gdGhpcyBibG9jay5cbiAgICovXG4gIGlubGluZUJsb2NrKGJsb2NrPzogKCkgPT4gdm9pZCk6IHRoaXMge1xuICAgIHRoaXMuX25ld0xpbmVJZk5ld0xpbmVPbk5leHRXcml0ZSgpO1xuICAgIHRoaXMud3JpdGUoXCJ7XCIpO1xuICAgIHRoaXMuX2luZGVudEJsb2NrSW50ZXJuYWwoYmxvY2spO1xuICAgIHRoaXMubmV3TGluZUlmTGFzdE5vdCgpLndyaXRlKFwifVwiKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEluZGVudHMgdGhlIGNvZGUgb25lIGxldmVsIGZvciB0aGUgY3VycmVudCBsaW5lLlxuICAgKi9cbiAgaW5kZW50KHRpbWVzPzogbnVtYmVyKTogdGhpcztcbiAgLyoqXG4gICAqIEluZGVudHMgYSBibG9jayBvZiBjb2RlLlxuICAgKiBAcGFyYW0gYmxvY2sgLSBCbG9jayB0byBpbmRlbnQuXG4gICAqL1xuICBpbmRlbnQoYmxvY2s6ICgpID0+IHZvaWQpOiB0aGlzO1xuICBpbmRlbnQodGltZXNPckJsb2NrOiBudW1iZXIgfCAoKCkgPT4gdm9pZCkgPSAxKSB7XG4gICAgaWYgKHR5cGVvZiB0aW1lc09yQmxvY2sgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgIHRoaXMuX25ld0xpbmVJZk5ld0xpbmVPbk5leHRXcml0ZSgpO1xuICAgICAgcmV0dXJuIHRoaXMud3JpdGUodGhpcy5faW5kZW50YXRpb25UZXh0LnJlcGVhdCh0aW1lc09yQmxvY2spKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faW5kZW50QmxvY2tJbnRlcm5hbCh0aW1lc09yQmxvY2spO1xuICAgICAgaWYgKCF0aGlzLmlzTGFzdE5ld0xpbmUoKSkge1xuICAgICAgICB0aGlzLl9uZXdMaW5lT25OZXh0V3JpdGUgPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBwcml2YXRlIF9pbmRlbnRCbG9ja0ludGVybmFsKGJsb2NrPzogKCkgPT4gdm9pZCkge1xuICAgIGlmICh0aGlzLmdldExhc3RDaGFyKCkgIT0gbnVsbCkge1xuICAgICAgdGhpcy5uZXdMaW5lSWZMYXN0Tm90KCk7XG4gICAgfVxuICAgIHRoaXMuX2N1cnJlbnRJbmRlbnRhdGlvbisrO1xuICAgIHRoaXMuX2lzT25GaXJzdExpbmVPZkJsb2NrID0gdHJ1ZTtcbiAgICBpZiAoYmxvY2sgIT0gbnVsbCkge1xuICAgICAgYmxvY2soKTtcbiAgICB9XG4gICAgdGhpcy5faXNPbkZpcnN0TGluZU9mQmxvY2sgPSBmYWxzZTtcbiAgICB0aGlzLl9jdXJyZW50SW5kZW50YXRpb24gPSBNYXRoLm1heCgwLCB0aGlzLl9jdXJyZW50SW5kZW50YXRpb24gLSAxKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb25kaXRpb25hbGx5IHdyaXRlcyBhIGxpbmUgb2YgdGV4dC5cbiAgICogQHBhcmFtIGNvbmRpdGlvbiAtIENvbmRpdGlvbiB0byBldmFsdWF0ZS5cbiAgICogQHBhcmFtIHRleHRGdW5jIC0gQSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYSBzdHJpbmcgdG8gd3JpdGUgaWYgdGhlIGNvbmRpdGlvbiBpcyB0cnVlLlxuICAgKi9cbiAgY29uZGl0aW9uYWxXcml0ZUxpbmUoY29uZGl0aW9uOiBib29sZWFuIHwgdW5kZWZpbmVkLCB0ZXh0RnVuYzogKCkgPT4gc3RyaW5nKTogdGhpcztcbiAgLyoqXG4gICAqIENvbmRpdGlvbmFsbHkgd3JpdGVzIGEgbGluZSBvZiB0ZXh0LlxuICAgKiBAcGFyYW0gY29uZGl0aW9uIC0gQ29uZGl0aW9uIHRvIGV2YWx1YXRlLlxuICAgKiBAcGFyYW0gdGV4dCAtIFRleHQgdG8gd3JpdGUgaWYgdGhlIGNvbmRpdGlvbiBpcyB0cnVlLlxuICAgKi9cbiAgY29uZGl0aW9uYWxXcml0ZUxpbmUoY29uZGl0aW9uOiBib29sZWFuIHwgdW5kZWZpbmVkLCB0ZXh0OiBzdHJpbmcpOiB0aGlzO1xuICBjb25kaXRpb25hbFdyaXRlTGluZShjb25kaXRpb246IGJvb2xlYW4gfCB1bmRlZmluZWQsIHN0ck9yRnVuYzogc3RyaW5nIHwgKCgpID0+IHN0cmluZykpIHtcbiAgICBpZiAoY29uZGl0aW9uKSB7XG4gICAgICB0aGlzLndyaXRlTGluZShnZXRTdHJpbmdGcm9tU3RyT3JGdW5jKHN0ck9yRnVuYykpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFdyaXRlcyBhIGxpbmUgb2YgdGV4dC5cbiAgICogQHBhcmFtIHRleHQgLSBTdHJpbmcgdG8gd3JpdGUuXG4gICAqL1xuICB3cml0ZUxpbmUodGV4dDogc3RyaW5nKTogdGhpcyB7XG4gICAgdGhpcy5fbmV3TGluZUlmTmV3TGluZU9uTmV4dFdyaXRlKCk7XG4gICAgaWYgKHRoaXMuZ2V0TGFzdENoYXIoKSAhPSBudWxsKSB7XG4gICAgICB0aGlzLm5ld0xpbmVJZkxhc3ROb3QoKTtcbiAgICB9XG4gICAgdGhpcy5fd3JpdGVJbmRlbnRpbmdOZXdMaW5lcyh0ZXh0KTtcbiAgICB0aGlzLm5ld0xpbmUoKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFdyaXRlcyBhIG5ld2xpbmUgaWYgdGhlIGxhc3QgbGluZSB3YXMgbm90IGEgbmV3bGluZS5cbiAgICovXG4gIG5ld0xpbmVJZkxhc3ROb3QoKTogdGhpcyB7XG4gICAgdGhpcy5fbmV3TGluZUlmTmV3TGluZU9uTmV4dFdyaXRlKCk7XG5cbiAgICBpZiAoIXRoaXMuaXNMYXN0TmV3TGluZSgpKSB7XG4gICAgICB0aGlzLm5ld0xpbmUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBXcml0ZXMgYSBibGFuayBsaW5lIGlmIHRoZSBsYXN0IHdyaXR0ZW4gdGV4dCB3YXMgbm90IGEgYmxhbmsgbGluZS5cbiAgICovXG4gIGJsYW5rTGluZUlmTGFzdE5vdCgpOiB0aGlzIHtcbiAgICBpZiAoIXRoaXMuaXNMYXN0QmxhbmtMaW5lKCkpIHtcbiAgICAgIHRoaXMuYmxhbmtMaW5lKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFdyaXRlcyBhIGJsYW5rIGxpbmUgaWYgdGhlIGNvbmRpdGlvbiBpcyB0cnVlLlxuICAgKiBAcGFyYW0gY29uZGl0aW9uIC0gQ29uZGl0aW9uIHRvIGV2YWx1YXRlLlxuICAgKi9cbiAgY29uZGl0aW9uYWxCbGFua0xpbmUoY29uZGl0aW9uOiBib29sZWFuIHwgdW5kZWZpbmVkKTogdGhpcyB7XG4gICAgaWYgKGNvbmRpdGlvbikge1xuICAgICAgdGhpcy5ibGFua0xpbmUoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogV3JpdGVzIGEgYmxhbmsgbGluZS5cbiAgICovXG4gIGJsYW5rTGluZSgpOiB0aGlzIHtcbiAgICByZXR1cm4gdGhpcy5uZXdMaW5lSWZMYXN0Tm90KCkubmV3TGluZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdyaXRlcyBhIG5ld2xpbmUgaWYgdGhlIGNvbmRpdGlvbiBpcyB0cnVlLlxuICAgKiBAcGFyYW0gY29uZGl0aW9uIC0gQ29uZGl0aW9uIHRvIGV2YWx1YXRlLlxuICAgKi9cbiAgY29uZGl0aW9uYWxOZXdMaW5lKGNvbmRpdGlvbjogYm9vbGVhbiB8IHVuZGVmaW5lZCk6IHRoaXMge1xuICAgIGlmIChjb25kaXRpb24pIHtcbiAgICAgIHRoaXMubmV3TGluZSgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBXcml0ZXMgYSBuZXdsaW5lLlxuICAgKi9cbiAgbmV3TGluZSgpOiB0aGlzIHtcbiAgICB0aGlzLl9uZXdMaW5lT25OZXh0V3JpdGUgPSBmYWxzZTtcbiAgICB0aGlzLl9iYXNlV3JpdGVOZXdsaW5lKCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogV3JpdGVzIGEgcXVvdGUgY2hhcmFjdGVyLlxuICAgKi9cbiAgcXVvdGUoKTogdGhpcztcbiAgLyoqXG4gICAqIFdyaXRlcyB0ZXh0IHN1cnJvdW5kZWQgaW4gcXVvdGVzLlxuICAgKiBAcGFyYW0gdGV4dCAtIFRleHQgdG8gd3JpdGUuXG4gICAqL1xuICBxdW90ZSh0ZXh0OiBzdHJpbmcpOiB0aGlzO1xuICBxdW90ZSh0ZXh0Pzogc3RyaW5nKSB7XG4gICAgdGhpcy5fbmV3TGluZUlmTmV3TGluZU9uTmV4dFdyaXRlKCk7XG4gICAgdGhpcy5fd3JpdGVJbmRlbnRpbmdOZXdMaW5lcyh0ZXh0ID09IG51bGwgPyB0aGlzLl9xdW90ZUNoYXIgOiB0aGlzLl9xdW90ZUNoYXIgKyBlc2NhcGVGb3JXaXRoaW5TdHJpbmcodGV4dCwgdGhpcy5fcXVvdGVDaGFyKSArIHRoaXMuX3F1b3RlQ2hhcik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogV3JpdGVzIGEgc3BhY2UgaWYgdGhlIGxhc3QgY2hhcmFjdGVyIHdhcyBub3QgYSBzcGFjZS5cbiAgICovXG4gIHNwYWNlSWZMYXN0Tm90KCk6IHRoaXMge1xuICAgIHRoaXMuX25ld0xpbmVJZk5ld0xpbmVPbk5leHRXcml0ZSgpO1xuXG4gICAgaWYgKCF0aGlzLmlzTGFzdFNwYWNlKCkpIHtcbiAgICAgIHRoaXMuX3dyaXRlSW5kZW50aW5nTmV3TGluZXMoXCIgXCIpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFdyaXRlcyBhIHNwYWNlLlxuICAgKiBAcGFyYW0gdGltZXMgLSBOdW1iZXIgb2YgdGltZXMgdG8gd3JpdGUgYSBzcGFjZS5cbiAgICovXG4gIHNwYWNlKHRpbWVzID0gMSk6IHRoaXMge1xuICAgIHRoaXMuX25ld0xpbmVJZk5ld0xpbmVPbk5leHRXcml0ZSgpO1xuICAgIHRoaXMuX3dyaXRlSW5kZW50aW5nTmV3TGluZXMoXCIgXCIucmVwZWF0KHRpbWVzKSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogV3JpdGVzIGEgdGFiIGlmIHRoZSBsYXN0IGNoYXJhY3RlciB3YXMgbm90IGEgdGFiLlxuICAgKi9cbiAgdGFiSWZMYXN0Tm90KCk6IHRoaXMge1xuICAgIHRoaXMuX25ld0xpbmVJZk5ld0xpbmVPbk5leHRXcml0ZSgpO1xuXG4gICAgaWYgKCF0aGlzLmlzTGFzdFRhYigpKSB7XG4gICAgICB0aGlzLl93cml0ZUluZGVudGluZ05ld0xpbmVzKFwiXFx0XCIpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFdyaXRlcyBhIHRhYi5cbiAgICogQHBhcmFtIHRpbWVzIC0gTnVtYmVyIG9mIHRpbWVzIHRvIHdyaXRlIGEgdGFiLlxuICAgKi9cbiAgdGFiKHRpbWVzID0gMSk6IHRoaXMge1xuICAgIHRoaXMuX25ld0xpbmVJZk5ld0xpbmVPbk5leHRXcml0ZSgpO1xuICAgIHRoaXMuX3dyaXRlSW5kZW50aW5nTmV3TGluZXMoXCJcXHRcIi5yZXBlYXQodGltZXMpKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBDb25kaXRpb25hbGx5IHdyaXRlcyB0ZXh0LlxuICAgKiBAcGFyYW0gY29uZGl0aW9uIC0gQ29uZGl0aW9uIHRvIGV2YWx1YXRlLlxuICAgKiBAcGFyYW0gdGV4dEZ1bmMgLSBBIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIHN0cmluZyB0byB3cml0ZSBpZiB0aGUgY29uZGl0aW9uIGlzIHRydWUuXG4gICAqL1xuICBjb25kaXRpb25hbFdyaXRlKGNvbmRpdGlvbjogYm9vbGVhbiB8IHVuZGVmaW5lZCwgdGV4dEZ1bmM6ICgpID0+IHN0cmluZyk6IHRoaXM7XG4gIC8qKlxuICAgKiBDb25kaXRpb25hbGx5IHdyaXRlcyB0ZXh0LlxuICAgKiBAcGFyYW0gY29uZGl0aW9uIC0gQ29uZGl0aW9uIHRvIGV2YWx1YXRlLlxuICAgKiBAcGFyYW0gdGV4dCAtIFRleHQgdG8gd3JpdGUgaWYgdGhlIGNvbmRpdGlvbiBpcyB0cnVlLlxuICAgKi9cbiAgY29uZGl0aW9uYWxXcml0ZShjb25kaXRpb246IGJvb2xlYW4gfCB1bmRlZmluZWQsIHRleHQ6IHN0cmluZyk6IHRoaXM7XG4gIGNvbmRpdGlvbmFsV3JpdGUoY29uZGl0aW9uOiBib29sZWFuIHwgdW5kZWZpbmVkLCB0ZXh0T3JGdW5jOiBzdHJpbmcgfCAoKCkgPT4gc3RyaW5nKSkge1xuICAgIGlmIChjb25kaXRpb24pIHtcbiAgICAgIHRoaXMud3JpdGUoZ2V0U3RyaW5nRnJvbVN0ck9yRnVuYyh0ZXh0T3JGdW5jKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogV3JpdGVzIHRoZSBwcm92aWRlZCB0ZXh0LlxuICAgKiBAcGFyYW0gdGV4dCAtIFRleHQgdG8gd3JpdGUuXG4gICAqL1xuICB3cml0ZSh0ZXh0OiBzdHJpbmcpOiB0aGlzIHtcbiAgICB0aGlzLl9uZXdMaW5lSWZOZXdMaW5lT25OZXh0V3JpdGUoKTtcbiAgICB0aGlzLl93cml0ZUluZGVudGluZ05ld0xpbmVzKHRleHQpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFdyaXRlcyB0ZXh0IHRvIGV4aXQgYSBjb21tZW50IGlmIGluIGEgY29tbWVudC5cbiAgICovXG4gIGNsb3NlQ29tbWVudCgpOiB0aGlzIHtcbiAgICBjb25zdCBjb21tZW50Q2hhciA9IHRoaXMuX2N1cnJlbnRDb21tZW50Q2hhcjtcblxuICAgIHN3aXRjaCAoY29tbWVudENoYXIpIHtcbiAgICAgIGNhc2UgQ29tbWVudENoYXIuTGluZTpcbiAgICAgICAgdGhpcy5uZXdMaW5lKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBDb21tZW50Q2hhci5TdGFyOlxuICAgICAgICBpZiAoIXRoaXMuaXNMYXN0TmV3TGluZSgpKSB7XG4gICAgICAgICAgdGhpcy5zcGFjZUlmTGFzdE5vdCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMud3JpdGUoXCIqL1wiKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIGNvbnN0IF9hc3NlcnRVbmRlZmluZWQ6IHVuZGVmaW5lZCA9IGNvbW1lbnRDaGFyO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnNlcnRzIHRleHQgYXQgdGhlIHByb3ZpZGVkIHBvc2l0aW9uLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBpcyBcInVuc2FmZVwiIGJlY2F1c2UgaXQgd29uJ3QgdXBkYXRlIHRoZSBzdGF0ZSBvZiB0aGUgd3JpdGVyIHVubGVzc1xuICAgKiBpbnNlcnRpbmcgYXQgdGhlIGVuZCBwb3NpdGlvbi4gSXQgaXMgYmlhc2VkIHRvd2FyZHMgYmVpbmcgZmFzdCBhdCBpbnNlcnRpbmcgY2xvc2VyXG4gICAqIHRvIHRoZSBzdGFydCBvciBlbmQsIGJ1dCBzbG93ZXIgdG8gaW5zZXJ0IGluIHRoZSBtaWRkbGUuIE9ubHkgdXNlIHRoaXMgaWZcbiAgICogYWJzb2x1dGVseSBuZWNlc3NhcnkuXG4gICAqIEBwYXJhbSBwb3MgLSBQb3NpdGlvbiB0byBpbnNlcnQgYXQuXG4gICAqIEBwYXJhbSB0ZXh0IC0gVGV4dCB0byBpbnNlcnQuXG4gICAqL1xuICB1bnNhZmVJbnNlcnQocG9zOiBudW1iZXIsIHRleHQ6IHN0cmluZyk6IHRoaXMge1xuICAgIGNvbnN0IHRleHRMZW5ndGggPSB0aGlzLl9sZW5ndGg7XG4gICAgY29uc3QgdGV4dHMgPSB0aGlzLl90ZXh0cztcbiAgICB2ZXJpZnlJbnB1dCgpO1xuXG4gICAgaWYgKHBvcyA9PT0gdGV4dExlbmd0aCkge1xuICAgICAgcmV0dXJuIHRoaXMud3JpdGUodGV4dCk7XG4gICAgfVxuXG4gICAgdXBkYXRlSW50ZXJuYWxBcnJheSgpO1xuICAgIHRoaXMuX2xlbmd0aCArPSB0ZXh0Lmxlbmd0aDtcblxuICAgIHJldHVybiB0aGlzO1xuXG4gICAgZnVuY3Rpb24gdmVyaWZ5SW5wdXQoKSB7XG4gICAgICBpZiAocG9zIDwgMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFByb3ZpZGVkIHBvc2l0aW9uIG9mICcke3Bvc30nIHdhcyBsZXNzIHRoYW4gemVyby5gKTtcbiAgICAgIH1cbiAgICAgIGlmIChwb3MgPiB0ZXh0TGVuZ3RoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgUHJvdmlkZWQgcG9zaXRpb24gb2YgJyR7cG9zfScgd2FzIGdyZWF0ZXIgdGhhbiB0aGUgdGV4dCBsZW5ndGggb2YgJyR7dGV4dExlbmd0aH0nLmApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUludGVybmFsQXJyYXkoKSB7XG4gICAgICBjb25zdCB7IGluZGV4LCBsb2NhbEluZGV4IH0gPSBnZXRBcnJheUluZGV4QW5kTG9jYWxJbmRleCgpO1xuXG4gICAgICBpZiAobG9jYWxJbmRleCA9PT0gMCkge1xuICAgICAgICB0ZXh0cy5zcGxpY2UoaW5kZXgsIDAsIHRleHQpO1xuICAgICAgfSBlbHNlIGlmIChsb2NhbEluZGV4ID09PSB0ZXh0c1tpbmRleF0ubGVuZ3RoKSB7XG4gICAgICAgIHRleHRzLnNwbGljZShpbmRleCArIDEsIDAsIHRleHQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgdGV4dEl0ZW0gPSB0ZXh0c1tpbmRleF07XG4gICAgICAgIGNvbnN0IHN0YXJ0VGV4dCA9IHRleHRJdGVtLnN1YnN0cmluZygwLCBsb2NhbEluZGV4KTtcbiAgICAgICAgY29uc3QgZW5kVGV4dCA9IHRleHRJdGVtLnN1YnN0cmluZyhsb2NhbEluZGV4KTtcbiAgICAgICAgdGV4dHMuc3BsaWNlKGluZGV4LCAxLCBzdGFydFRleHQsIHRleHQsIGVuZFRleHQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEFycmF5SW5kZXhBbmRMb2NhbEluZGV4KCkge1xuICAgICAgaWYgKHBvcyA8IHRleHRMZW5ndGggLyAyKSB7XG4gICAgICAgIC8vIHN0YXJ0IHNlYXJjaGluZyBmcm9tIHRoZSBmcm9udFxuICAgICAgICBsZXQgZW5kUG9zID0gMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZXh0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNvbnN0IHRleHRJdGVtID0gdGV4dHNbaV07XG4gICAgICAgICAgY29uc3Qgc3RhcnRQb3MgPSBlbmRQb3M7XG4gICAgICAgICAgZW5kUG9zICs9IHRleHRJdGVtLmxlbmd0aDtcbiAgICAgICAgICBpZiAoZW5kUG9zID49IHBvcykge1xuICAgICAgICAgICAgcmV0dXJuIHsgaW5kZXg6IGksIGxvY2FsSW5kZXg6IHBvcyAtIHN0YXJ0UG9zIH07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBzdGFydCBzZWFyY2hpbmcgZnJvbSB0aGUgYmFja1xuICAgICAgICBsZXQgc3RhcnRQb3MgPSB0ZXh0TGVuZ3RoO1xuICAgICAgICBmb3IgKGxldCBpID0gdGV4dHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICBjb25zdCB0ZXh0SXRlbSA9IHRleHRzW2ldO1xuICAgICAgICAgIHN0YXJ0UG9zIC09IHRleHRJdGVtLmxlbmd0aDtcbiAgICAgICAgICBpZiAoc3RhcnRQb3MgPD0gcG9zKSB7XG4gICAgICAgICAgICByZXR1cm4geyBpbmRleDogaSwgbG9jYWxJbmRleDogcG9zIC0gc3RhcnRQb3MgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5oYW5kbGVkIHNpdHVhdGlvbiBpbnNlcnRpbmcuIFRoaXMgc2hvdWxkIG5ldmVyIGhhcHBlbi5cIik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGxlbmd0aCBvZiB0aGUgc3RyaW5nIGluIHRoZSB3cml0ZXIuXG4gICAqL1xuICBnZXRMZW5ndGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbGVuZ3RoO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgaWYgdGhlIHdyaXRlciBpcyBjdXJyZW50bHkgaW4gYSBjb21tZW50LlxuICAgKi9cbiAgaXNJbkNvbW1lbnQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRDb21tZW50Q2hhciAhPT0gdW5kZWZpbmVkO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgaWYgdGhlIHdyaXRlciBpcyBjdXJyZW50bHkgYXQgdGhlIHN0YXJ0IG9mIHRoZSBmaXJzdCBsaW5lIG9mIHRoZSB0ZXh0LCBibG9jaywgb3IgaW5kZW50YXRpb24gYmxvY2suXG4gICAqL1xuICBpc0F0U3RhcnRPZkZpcnN0TGluZU9mQmxvY2soKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaXNPbkZpcnN0TGluZU9mQmxvY2soKSAmJiAodGhpcy5pc0xhc3ROZXdMaW5lKCkgfHwgdGhpcy5nZXRMYXN0Q2hhcigpID09IG51bGwpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgaWYgdGhlIHdyaXRlciBpcyBjdXJyZW50bHkgb24gdGhlIGZpcnN0IGxpbmUgb2YgdGhlIHRleHQsIGJsb2NrLCBvciBpbmRlbnRhdGlvbiBibG9jay5cbiAgICovXG4gIGlzT25GaXJzdExpbmVPZkJsb2NrKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pc09uRmlyc3RMaW5lT2ZCbG9jaztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGlmIHRoZSB3cml0ZXIgaXMgY3VycmVudGx5IGluIGEgc3RyaW5nLlxuICAgKi9cbiAgaXNJblN0cmluZygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc3RyaW5nQ2hhclN0YWNrLmxlbmd0aCA+IDAgJiYgdGhpcy5fc3RyaW5nQ2hhclN0YWNrW3RoaXMuX3N0cmluZ0NoYXJTdGFjay5sZW5ndGggLSAxXSAhPT0gQ0hBUlMuT1BFTl9CUkFDRTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGlmIHRoZSBsYXN0IGNoYXJzIHdyaXR0ZW4gd2VyZSBmb3IgYSBuZXdsaW5lLlxuICAgKi9cbiAgaXNMYXN0TmV3TGluZSgpOiBib29sZWFuIHtcbiAgICBjb25zdCBsYXN0Q2hhciA9IHRoaXMuZ2V0TGFzdENoYXIoKTtcbiAgICByZXR1cm4gbGFzdENoYXIgPT09IFwiXFxuXCIgfHwgbGFzdENoYXIgPT09IFwiXFxyXCI7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBpZiB0aGUgbGFzdCBjaGFycyB3cml0dGVuIHdlcmUgZm9yIGEgYmxhbmsgbGluZS5cbiAgICovXG4gIGlzTGFzdEJsYW5rTGluZSgpOiBib29sZWFuIHtcbiAgICBsZXQgZm91bmRDb3VudCA9IDA7XG5cbiAgICAvLyB0b2RvOiBjb25zaWRlciBleHRyYWN0aW5nIG91dCBpdGVyYXRpbmcgb3ZlciBwYXN0IGNoYXJhY3RlcnMsIGJ1dCBkb24ndCB1c2VcbiAgICAvLyBhbiBpdGVyYXRvciBiZWNhdXNlIGl0IHdpbGwgYmUgc2xvdy5cbiAgICBmb3IgKGxldCBpID0gdGhpcy5fdGV4dHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIGNvbnN0IGN1cnJlbnRUZXh0ID0gdGhpcy5fdGV4dHNbaV07XG4gICAgICBmb3IgKGxldCBqID0gY3VycmVudFRleHQubGVuZ3RoIC0gMTsgaiA+PSAwOyBqLS0pIHtcbiAgICAgICAgY29uc3QgY3VycmVudENoYXIgPSBjdXJyZW50VGV4dC5jaGFyQ29kZUF0KGopO1xuICAgICAgICBpZiAoY3VycmVudENoYXIgPT09IENIQVJTLk5FV19MSU5FKSB7XG4gICAgICAgICAgZm91bmRDb3VudCsrO1xuICAgICAgICAgIGlmIChmb3VuZENvdW50ID09PSAyKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoY3VycmVudENoYXIgIT09IENIQVJTLkNBUlJJQUdFX1JFVFVSTikge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGlmIHRoZSBsYXN0IGNoYXIgd3JpdHRlbiB3YXMgYSBzcGFjZS5cbiAgICovXG4gIGlzTGFzdFNwYWNlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmdldExhc3RDaGFyKCkgPT09IFwiIFwiO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgaWYgdGhlIGxhc3QgY2hhciB3cml0dGVuIHdhcyBhIHRhYi5cbiAgICovXG4gIGlzTGFzdFRhYigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5nZXRMYXN0Q2hhcigpID09PSBcIlxcdFwiO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGxhc3QgY2hhciB3cml0dGVuLlxuICAgKi9cbiAgZ2V0TGFzdENoYXIoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBjaGFyQ29kZSA9IHRoaXMuX2dldExhc3RDaGFyQ29kZVdpdGhPZmZzZXQoMCk7XG4gICAgcmV0dXJuIGNoYXJDb2RlID09IG51bGwgPyB1bmRlZmluZWQgOiBTdHJpbmcuZnJvbUNoYXJDb2RlKGNoYXJDb2RlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGlmIHRoZSB3cml0ZXIgZW5kcyB3aXRoIHRoZSBwcm92aWRlZCB0ZXh0LlxuICAgKiBAcGFyYW0gdGV4dCAtIFRleHQgdG8gY2hlY2sgaWYgdGhlIHdyaXRlciBlbmRzIHdpdGggdGhlIHByb3ZpZGVkIHRleHQuXG4gICAqL1xuICBlbmRzV2l0aCh0ZXh0OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBjb25zdCBsZW5ndGggPSB0aGlzLl9sZW5ndGg7XG4gICAgcmV0dXJuIHRoaXMuaXRlcmF0ZUxhc3RDaGFyQ29kZXMoKGNoYXJDb2RlLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3Qgb2Zmc2V0ID0gbGVuZ3RoIC0gaW5kZXg7XG4gICAgICBjb25zdCB0ZXh0SW5kZXggPSB0ZXh0Lmxlbmd0aCAtIG9mZnNldDtcbiAgICAgIGlmICh0ZXh0LmNoYXJDb2RlQXQodGV4dEluZGV4KSAhPT0gY2hhckNvZGUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRleHRJbmRleCA9PT0gMCA/IHRydWUgOiB1bmRlZmluZWQ7XG4gICAgfSkgfHwgZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogSXRlcmF0ZXMgb3ZlciB0aGUgd3JpdGVyIGNoYXJhY3RlcnMgaW4gcmV2ZXJzZSBvcmRlci4gVGhlIGl0ZXJhdGlvbiBzdG9wcyB3aGVuIGEgbm9uLW51bGwgb3JcbiAgICogdW5kZWZpbmVkIHZhbHVlIGlzIHJldHVybmVkIGZyb20gdGhlIGFjdGlvbi4gVGhlIHJldHVybmVkIHZhbHVlIGlzIHRoZW4gcmV0dXJuZWQgYnkgdGhlIG1ldGhvZC5cbiAgICpcbiAgICogQHJlbWFya3MgSXQgaXMgbXVjaCBtb3JlIGVmZmljaWVudCB0byB1c2UgdGhpcyBtZXRob2QgcmF0aGVyIHRoYW4gYCN0b1N0cmluZygpYCBzaW5jZSBgI3RvU3RyaW5nKClgXG4gICAqIHdpbGwgY29tYmluZSB0aGUgaW50ZXJuYWwgYXJyYXkgaW50byBhIHN0cmluZy5cbiAgICovXG4gIGl0ZXJhdGVMYXN0Q2hhcnM8VD4oYWN0aW9uOiAoY2hhcjogc3RyaW5nLCBpbmRleDogbnVtYmVyKSA9PiBUIHwgdW5kZWZpbmVkKTogVCB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuaXRlcmF0ZUxhc3RDaGFyQ29kZXMoKGNoYXJDb2RlLCBpbmRleCkgPT4gYWN0aW9uKFN0cmluZy5mcm9tQ2hhckNvZGUoY2hhckNvZGUpLCBpbmRleCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEl0ZXJhdGVzIG92ZXIgdGhlIHdyaXRlciBjaGFyYWN0ZXIgY2hhciBjb2RlcyBpbiByZXZlcnNlIG9yZGVyLiBUaGUgaXRlcmF0aW9uIHN0b3BzIHdoZW4gYSBub24tbnVsbCBvclxuICAgKiB1bmRlZmluZWQgdmFsdWUgaXMgcmV0dXJuZWQgZnJvbSB0aGUgYWN0aW9uLiBUaGUgcmV0dXJuZWQgdmFsdWUgaXMgdGhlbiByZXR1cm5lZCBieSB0aGUgbWV0aG9kLlxuICAgKlxuICAgKiBAcmVtYXJrcyBJdCBpcyBtdWNoIG1vcmUgZWZmaWNpZW50IHRvIHVzZSB0aGlzIG1ldGhvZCByYXRoZXIgdGhhbiBgI3RvU3RyaW5nKClgIHNpbmNlIGAjdG9TdHJpbmcoKWBcbiAgICogd2lsbCBjb21iaW5lIHRoZSBpbnRlcm5hbCBhcnJheSBpbnRvIGEgc3RyaW5nLiBBZGRpdGlvbmFsbHksIHRoaXMgaXMgc2xpZ2h0bHkgbW9yZSBlZmZpY2llbnQgdGhhdFxuICAgKiBgaXRlcmF0ZUxhc3RDaGFyc2AgYXMgdGhpcyB3b24ndCBhbGxvY2F0ZSBhIHN0cmluZyBwZXIgY2hhcmFjdGVyLlxuICAgKi9cbiAgaXRlcmF0ZUxhc3RDaGFyQ29kZXM8VD4oYWN0aW9uOiAoY2hhckNvZGU6IG51bWJlciwgaW5kZXg6IG51bWJlcikgPT4gVCB8IHVuZGVmaW5lZCk6IFQgfCB1bmRlZmluZWQge1xuICAgIGxldCBpbmRleCA9IHRoaXMuX2xlbmd0aDtcbiAgICBmb3IgKGxldCBpID0gdGhpcy5fdGV4dHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIGNvbnN0IGN1cnJlbnRUZXh0ID0gdGhpcy5fdGV4dHNbaV07XG4gICAgICBmb3IgKGxldCBqID0gY3VycmVudFRleHQubGVuZ3RoIC0gMTsgaiA+PSAwOyBqLS0pIHtcbiAgICAgICAgaW5kZXgtLTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYWN0aW9uKGN1cnJlbnRUZXh0LmNoYXJDb2RlQXQoaiksIGluZGV4KTtcbiAgICAgICAgaWYgKHJlc3VsdCAhPSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHdyaXRlcidzIHRleHQuXG4gICAqL1xuICB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLl90ZXh0cy5sZW5ndGggPiAxKSB7XG4gICAgICBjb25zdCB0ZXh0ID0gdGhpcy5fdGV4dHMuam9pbihcIlwiKTtcbiAgICAgIHRoaXMuX3RleHRzLmxlbmd0aCA9IDA7XG4gICAgICB0aGlzLl90ZXh0cy5wdXNoKHRleHQpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl90ZXh0c1swXSB8fCBcIlwiO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBfbmV3TGluZVJlZ0V4ID0gL1xccj9cXG4vO1xuICAvKiogQGludGVybmFsICovXG4gIHByaXZhdGUgX3dyaXRlSW5kZW50aW5nTmV3TGluZXModGV4dDogc3RyaW5nKSB7XG4gICAgdGV4dCA9IHRleHQgfHwgXCJcIjtcbiAgICBpZiAodGV4dC5sZW5ndGggPT09IDApIHtcbiAgICAgIHdyaXRlSW5kaXZpZHVhbCh0aGlzLCBcIlwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBpdGVtcyA9IHRleHQuc3BsaXQoQ29kZUJsb2NrV3JpdGVyLl9uZXdMaW5lUmVnRXgpO1xuICAgIGl0ZW1zLmZvckVhY2goKHMsIGkpID0+IHtcbiAgICAgIGlmIChpID4gMCkge1xuICAgICAgICB0aGlzLl9iYXNlV3JpdGVOZXdsaW5lKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHdyaXRlSW5kaXZpZHVhbCh0aGlzLCBzKTtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIHdyaXRlSW5kaXZpZHVhbCh3cml0ZXI6IENvZGVCbG9ja1dyaXRlciwgczogc3RyaW5nKSB7XG4gICAgICBpZiAoIXdyaXRlci5pc0luU3RyaW5nKCkpIHtcbiAgICAgICAgY29uc3QgaXNBdFN0YXJ0T2ZMaW5lID0gd3JpdGVyLmlzTGFzdE5ld0xpbmUoKSB8fCB3cml0ZXIuZ2V0TGFzdENoYXIoKSA9PSBudWxsO1xuICAgICAgICBpZiAoaXNBdFN0YXJ0T2ZMaW5lKSB7XG4gICAgICAgICAgd3JpdGVyLl93cml0ZUluZGVudGF0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgd3JpdGVyLl91cGRhdGVJbnRlcm5hbFN0YXRlKHMpO1xuICAgICAgd3JpdGVyLl9pbnRlcm5hbFdyaXRlKHMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcHJpdmF0ZSBfYmFzZVdyaXRlTmV3bGluZSgpIHtcbiAgICBpZiAodGhpcy5fY3VycmVudENvbW1lbnRDaGFyID09PSBDb21tZW50Q2hhci5MaW5lKSB7XG4gICAgICB0aGlzLl9jdXJyZW50Q29tbWVudENoYXIgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgY29uc3QgbGFzdFN0cmluZ0NoYXJPblN0YWNrID0gdGhpcy5fc3RyaW5nQ2hhclN0YWNrW3RoaXMuX3N0cmluZ0NoYXJTdGFjay5sZW5ndGggLSAxXTtcbiAgICBpZiAoKGxhc3RTdHJpbmdDaGFyT25TdGFjayA9PT0gQ0hBUlMuRE9VQkxFX1FVT1RFIHx8IGxhc3RTdHJpbmdDaGFyT25TdGFjayA9PT0gQ0hBUlMuU0lOR0xFX1FVT1RFKSAmJiB0aGlzLl9nZXRMYXN0Q2hhckNvZGVXaXRoT2Zmc2V0KDApICE9PSBDSEFSUy5CQUNLX1NMQVNIKSB7XG4gICAgICB0aGlzLl9zdHJpbmdDaGFyU3RhY2sucG9wKCk7XG4gICAgfVxuXG4gICAgdGhpcy5faW50ZXJuYWxXcml0ZSh0aGlzLl9uZXdMaW5lKTtcbiAgICB0aGlzLl9pc09uRmlyc3RMaW5lT2ZCbG9jayA9IGZhbHNlO1xuICAgIHRoaXMuX2RlcXVldWVRdWV1ZWRJbmRlbnRhdGlvbigpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBwcml2YXRlIF9kZXF1ZXVlUXVldWVkSW5kZW50YXRpb24oKSB7XG4gICAgaWYgKHRoaXMuX3F1ZXVlZEluZGVudGF0aW9uID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fcXVldWVkT25seUlmTm90QmxvY2sgJiYgd2FzTGFzdEJsb2NrKHRoaXMpKSB7XG4gICAgICB0aGlzLl9xdWV1ZWRJbmRlbnRhdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuX3F1ZXVlZE9ubHlJZk5vdEJsb2NrID0gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9jdXJyZW50SW5kZW50YXRpb24gPSB0aGlzLl9xdWV1ZWRJbmRlbnRhdGlvbjtcbiAgICAgIHRoaXMuX3F1ZXVlZEluZGVudGF0aW9uID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHdhc0xhc3RCbG9jayh3cml0ZXI6IENvZGVCbG9ja1dyaXRlcikge1xuICAgICAgbGV0IGZvdW5kTmV3TGluZSA9IGZhbHNlO1xuICAgICAgcmV0dXJuIHdyaXRlci5pdGVyYXRlTGFzdENoYXJDb2RlcyhjaGFyQ29kZSA9PiB7XG4gICAgICAgIHN3aXRjaCAoY2hhckNvZGUpIHtcbiAgICAgICAgICBjYXNlIENIQVJTLk5FV19MSU5FOlxuICAgICAgICAgICAgaWYgKGZvdW5kTmV3TGluZSkge1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBmb3VuZE5ld0xpbmUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBDSEFSUy5DQVJSSUFHRV9SRVRVUk46XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgIGNhc2UgQ0hBUlMuT1BFTl9CUkFDRTpcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcHJpdmF0ZSBfdXBkYXRlSW50ZXJuYWxTdGF0ZShzdHI6IHN0cmluZykge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBjdXJyZW50Q2hhciA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuXG4gICAgICAvLyBUaGlzIGlzIGEgcGVyZm9ybWFuY2Ugb3B0aW1pemF0aW9uIHRvIHNob3J0IGNpcmN1aXQgYWxsIHRoZSBjaGVja3MgYmVsb3cuIElmIHRoZSBjdXJyZW50IGNoYXJcbiAgICAgIC8vIGlzIG5vdCBpbiB0aGlzIHNldCB0aGVuIGl0IHdvbid0IGNoYW5nZSBhbnkgaW50ZXJuYWwgc3RhdGUgc28gbm8gbmVlZCB0byBjb250aW51ZSBhbmQgZG9cbiAgICAgIC8vIHNvIG1hbnkgb3RoZXIgY2hlY2tzICh0aGlzIG1hZGUgaXQgM3ggZmFzdGVyIGluIG9uZSBzY2VuYXJpbyBJIHRlc3RlZCkuXG4gICAgICBpZiAoIWlzQ2hhclRvSGFuZGxlLmhhcyhjdXJyZW50Q2hhcikpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBhc3RDaGFyID0gaSA9PT0gMCA/IHRoaXMuX2dldExhc3RDaGFyQ29kZVdpdGhPZmZzZXQoMCkgOiBzdHIuY2hhckNvZGVBdChpIC0gMSk7XG4gICAgICBjb25zdCBwYXN0UGFzdENoYXIgPSBpID09PSAwID8gdGhpcy5fZ2V0TGFzdENoYXJDb2RlV2l0aE9mZnNldCgxKSA6IGkgPT09IDEgPyB0aGlzLl9nZXRMYXN0Q2hhckNvZGVXaXRoT2Zmc2V0KDApIDogc3RyLmNoYXJDb2RlQXQoaSAtIDIpO1xuXG4gICAgICAvLyBoYW5kbGUgcmVnZXhcbiAgICAgIGlmICh0aGlzLl9pc0luUmVnRXgpIHtcbiAgICAgICAgaWYgKHBhc3RDaGFyID09PSBDSEFSUy5GT1JXQVJEX1NMQVNIICYmIHBhc3RQYXN0Q2hhciAhPT0gQ0hBUlMuQkFDS19TTEFTSCB8fCBwYXN0Q2hhciA9PT0gQ0hBUlMuTkVXX0xJTkUpIHtcbiAgICAgICAgICB0aGlzLl9pc0luUmVnRXggPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICghdGhpcy5pc0luU3RyaW5nKCkgJiYgIXRoaXMuaXNJbkNvbW1lbnQoKSAmJiBpc1JlZ0V4U3RhcnQoY3VycmVudENoYXIsIHBhc3RDaGFyLCBwYXN0UGFzdENoYXIpKSB7XG4gICAgICAgIHRoaXMuX2lzSW5SZWdFeCA9IHRydWU7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBoYW5kbGUgY29tbWVudHNcbiAgICAgIGlmICh0aGlzLl9jdXJyZW50Q29tbWVudENoYXIgPT0gbnVsbCAmJiBwYXN0Q2hhciA9PT0gQ0hBUlMuRk9SV0FSRF9TTEFTSCAmJiBjdXJyZW50Q2hhciA9PT0gQ0hBUlMuRk9SV0FSRF9TTEFTSCkge1xuICAgICAgICB0aGlzLl9jdXJyZW50Q29tbWVudENoYXIgPSBDb21tZW50Q2hhci5MaW5lO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLl9jdXJyZW50Q29tbWVudENoYXIgPT0gbnVsbCAmJiBwYXN0Q2hhciA9PT0gQ0hBUlMuRk9SV0FSRF9TTEFTSCAmJiBjdXJyZW50Q2hhciA9PT0gQ0hBUlMuQVNURVJJU0spIHtcbiAgICAgICAgdGhpcy5fY3VycmVudENvbW1lbnRDaGFyID0gQ29tbWVudENoYXIuU3RhcjtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fY3VycmVudENvbW1lbnRDaGFyID09PSBDb21tZW50Q2hhci5TdGFyICYmIHBhc3RDaGFyID09PSBDSEFSUy5BU1RFUklTSyAmJiBjdXJyZW50Q2hhciA9PT0gQ0hBUlMuRk9SV0FSRF9TTEFTSCkge1xuICAgICAgICB0aGlzLl9jdXJyZW50Q29tbWVudENoYXIgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmlzSW5Db21tZW50KCkpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIGhhbmRsZSBzdHJpbmdzXG4gICAgICBjb25zdCBsYXN0U3RyaW5nQ2hhck9uU3RhY2sgPSB0aGlzLl9zdHJpbmdDaGFyU3RhY2subGVuZ3RoID09PSAwID8gdW5kZWZpbmVkIDogdGhpcy5fc3RyaW5nQ2hhclN0YWNrW3RoaXMuX3N0cmluZ0NoYXJTdGFjay5sZW5ndGggLSAxXTtcbiAgICAgIGlmIChwYXN0Q2hhciAhPT0gQ0hBUlMuQkFDS19TTEFTSCAmJiAoY3VycmVudENoYXIgPT09IENIQVJTLkRPVUJMRV9RVU9URSB8fCBjdXJyZW50Q2hhciA9PT0gQ0hBUlMuU0lOR0xFX1FVT1RFIHx8IGN1cnJlbnRDaGFyID09PSBDSEFSUy5CQUNLX1RJQ0spKSB7XG4gICAgICAgIGlmIChsYXN0U3RyaW5nQ2hhck9uU3RhY2sgPT09IGN1cnJlbnRDaGFyKSB7XG4gICAgICAgICAgdGhpcy5fc3RyaW5nQ2hhclN0YWNrLnBvcCgpO1xuICAgICAgICB9IGVsc2UgaWYgKGxhc3RTdHJpbmdDaGFyT25TdGFjayA9PT0gQ0hBUlMuT1BFTl9CUkFDRSB8fCBsYXN0U3RyaW5nQ2hhck9uU3RhY2sgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRoaXMuX3N0cmluZ0NoYXJTdGFjay5wdXNoKGN1cnJlbnRDaGFyKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChwYXN0UGFzdENoYXIgIT09IENIQVJTLkJBQ0tfU0xBU0ggJiYgcGFzdENoYXIgPT09IENIQVJTLkRPTExBUl9TSUdOICYmIGN1cnJlbnRDaGFyID09PSBDSEFSUy5PUEVOX0JSQUNFICYmIGxhc3RTdHJpbmdDaGFyT25TdGFjayA9PT0gQ0hBUlMuQkFDS19USUNLKSB7XG4gICAgICAgIHRoaXMuX3N0cmluZ0NoYXJTdGFjay5wdXNoKGN1cnJlbnRDaGFyKTtcbiAgICAgIH0gZWxzZSBpZiAoY3VycmVudENoYXIgPT09IENIQVJTLkNMT1NFX0JSQUNFICYmIGxhc3RTdHJpbmdDaGFyT25TdGFjayA9PT0gQ0hBUlMuT1BFTl9CUkFDRSkge1xuICAgICAgICB0aGlzLl9zdHJpbmdDaGFyU3RhY2sucG9wKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAtIFRoaXMgaXMgcHJpdmF0ZSwgYnV0IGV4cG9zZWQgZm9yIHRlc3RpbmcuICovXG4gIF9nZXRMYXN0Q2hhckNvZGVXaXRoT2Zmc2V0KG9mZnNldDogbnVtYmVyKSB7XG4gICAgaWYgKG9mZnNldCA+PSB0aGlzLl9sZW5ndGggfHwgb2Zmc2V0IDwgMCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gdGhpcy5fdGV4dHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIGNvbnN0IGN1cnJlbnRUZXh0ID0gdGhpcy5fdGV4dHNbaV07XG4gICAgICBpZiAob2Zmc2V0ID49IGN1cnJlbnRUZXh0Lmxlbmd0aCkge1xuICAgICAgICBvZmZzZXQgLT0gY3VycmVudFRleHQubGVuZ3RoO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRUZXh0LmNoYXJDb2RlQXQoY3VycmVudFRleHQubGVuZ3RoIC0gMSAtIG9mZnNldCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIHByaXZhdGUgX3dyaXRlSW5kZW50YXRpb24oKSB7XG4gICAgY29uc3QgZmxvb3JlZEluZGVudGF0aW9uID0gTWF0aC5mbG9vcih0aGlzLl9jdXJyZW50SW5kZW50YXRpb24pO1xuICAgIHRoaXMuX2ludGVybmFsV3JpdGUodGhpcy5faW5kZW50YXRpb25UZXh0LnJlcGVhdChmbG9vcmVkSW5kZW50YXRpb24pKTtcblxuICAgIGNvbnN0IG92ZXJmbG93ID0gdGhpcy5fY3VycmVudEluZGVudGF0aW9uIC0gZmxvb3JlZEluZGVudGF0aW9uO1xuICAgIGlmICh0aGlzLl91c2VUYWJzKSB7XG4gICAgICBpZiAob3ZlcmZsb3cgPiAwLjUpIHtcbiAgICAgICAgdGhpcy5faW50ZXJuYWxXcml0ZSh0aGlzLl9pbmRlbnRhdGlvblRleHQpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBwb3J0aW9uID0gTWF0aC5yb3VuZCh0aGlzLl9pbmRlbnRhdGlvblRleHQubGVuZ3RoICogb3ZlcmZsb3cpO1xuXG4gICAgICAvLyBidWlsZCB1cCB0aGUgc3RyaW5nIGZpcnN0LCB0aGVuIGFwcGVuZCBpdCBmb3IgcGVyZm9ybWFuY2UgcmVhc29uc1xuICAgICAgbGV0IHRleHQgPSBcIlwiO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb3J0aW9uOyBpKyspIHtcbiAgICAgICAgdGV4dCArPSB0aGlzLl9pbmRlbnRhdGlvblRleHRbaV07XG4gICAgICB9XG4gICAgICB0aGlzLl9pbnRlcm5hbFdyaXRlKHRleHQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcHJpdmF0ZSBfbmV3TGluZUlmTmV3TGluZU9uTmV4dFdyaXRlKCkge1xuICAgIGlmICghdGhpcy5fbmV3TGluZU9uTmV4dFdyaXRlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX25ld0xpbmVPbk5leHRXcml0ZSA9IGZhbHNlO1xuICAgIHRoaXMubmV3TGluZSgpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBwcml2YXRlIF9pbnRlcm5hbFdyaXRlKHRleHQ6IHN0cmluZykge1xuICAgIGlmICh0ZXh0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX3RleHRzLnB1c2godGV4dCk7XG4gICAgdGhpcy5fbGVuZ3RoICs9IHRleHQubGVuZ3RoO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBfc3BhY2VzT3JUYWJzUmVnRXggPSAvXlsgXFx0XSokLztcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBwcml2YXRlIF9nZXRJbmRlbnRhdGlvbkxldmVsRnJvbUFyZyhjb3VudE9yVGV4dDogc3RyaW5nIHwgbnVtYmVyKSB7XG4gICAgaWYgKHR5cGVvZiBjb3VudE9yVGV4dCA9PT0gXCJudW1iZXJcIikge1xuICAgICAgaWYgKGNvdW50T3JUZXh0IDwgMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQYXNzZWQgaW4gaW5kZW50YXRpb24gbGV2ZWwgc2hvdWxkIGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAwLlwiKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb3VudE9yVGV4dDtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb3VudE9yVGV4dCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgaWYgKCFDb2RlQmxvY2tXcml0ZXIuX3NwYWNlc09yVGFic1JlZ0V4LnRlc3QoY291bnRPclRleHQpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlByb3ZpZGVkIHN0cmluZyBtdXN0IGJlIGVtcHR5IG9yIG9ubHkgY29udGFpbiBzcGFjZXMgb3IgdGFicy5cIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHsgc3BhY2VzQ291bnQsIHRhYnNDb3VudCB9ID0gZ2V0U3BhY2VzQW5kVGFic0NvdW50KGNvdW50T3JUZXh0KTtcbiAgICAgIHJldHVybiB0YWJzQ291bnQgKyBzcGFjZXNDb3VudCAvIHRoaXMuX2luZGVudE51bWJlck9mU3BhY2VzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBcmd1bWVudCBwcm92aWRlZCBtdXN0IGJlIGEgc3RyaW5nIG9yIG51bWJlci5cIik7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBwcml2YXRlIF9zZXRJbmRlbnRhdGlvblN0YXRlKHN0YXRlOiBJbmRlbnRhdGlvbkxldmVsU3RhdGUpIHtcbiAgICB0aGlzLl9jdXJyZW50SW5kZW50YXRpb24gPSBzdGF0ZS5jdXJyZW50O1xuICAgIHRoaXMuX3F1ZXVlZEluZGVudGF0aW9uID0gc3RhdGUucXVldWVkO1xuICAgIHRoaXMuX3F1ZXVlZE9ubHlJZk5vdEJsb2NrID0gc3RhdGUucXVldWVkT25seUlmTm90QmxvY2s7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIHByaXZhdGUgX2dldEluZGVudGF0aW9uU3RhdGUoKTogSW5kZW50YXRpb25MZXZlbFN0YXRlIHtcbiAgICByZXR1cm4ge1xuICAgICAgY3VycmVudDogdGhpcy5fY3VycmVudEluZGVudGF0aW9uLFxuICAgICAgcXVldWVkOiB0aGlzLl9xdWV1ZWRJbmRlbnRhdGlvbixcbiAgICAgIHF1ZXVlZE9ubHlJZk5vdEJsb2NrOiB0aGlzLl9xdWV1ZWRPbmx5SWZOb3RCbG9jayxcbiAgICB9O1xuICB9XG59XG5cbmludGVyZmFjZSBJbmRlbnRhdGlvbkxldmVsU3RhdGUge1xuICBjdXJyZW50OiBudW1iZXI7XG4gIHF1ZXVlZDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICBxdWV1ZWRPbmx5SWZOb3RCbG9jazogdHJ1ZSB8IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gaXNSZWdFeFN0YXJ0KGN1cnJlbnRDaGFyOiBudW1iZXIsIHBhc3RDaGFyOiBudW1iZXIgfCB1bmRlZmluZWQsIHBhc3RQYXN0Q2hhcjogbnVtYmVyIHwgdW5kZWZpbmVkKSB7XG4gIHJldHVybiBwYXN0Q2hhciA9PT0gQ0hBUlMuRk9SV0FSRF9TTEFTSFxuICAgICYmIGN1cnJlbnRDaGFyICE9PSBDSEFSUy5GT1JXQVJEX1NMQVNIXG4gICAgJiYgY3VycmVudENoYXIgIT09IENIQVJTLkFTVEVSSVNLXG4gICAgJiYgcGFzdFBhc3RDaGFyICE9PSBDSEFSUy5BU1RFUklTS1xuICAgICYmIHBhc3RQYXN0Q2hhciAhPT0gQ0hBUlMuRk9SV0FSRF9TTEFTSDtcbn1cblxuZnVuY3Rpb24gZ2V0SW5kZW50YXRpb25UZXh0KHVzZVRhYnM6IGJvb2xlYW4sIG51bWJlclNwYWNlczogbnVtYmVyKSB7XG4gIGlmICh1c2VUYWJzKSB7XG4gICAgcmV0dXJuIFwiXFx0XCI7XG4gIH1cbiAgcmV0dXJuIEFycmF5KG51bWJlclNwYWNlcyArIDEpLmpvaW4oXCIgXCIpO1xufVxuXG5mdW5jdGlvbiBnZXRTcGFjZXNBbmRUYWJzQ291bnQoc3RyOiBzdHJpbmcpIHtcbiAgbGV0IHNwYWNlc0NvdW50ID0gMDtcbiAgbGV0IHRhYnNDb3VudCA9IDA7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBjaGFyQ29kZSA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgIGlmIChjaGFyQ29kZSA9PT0gQ0hBUlMuU1BBQ0UpIHtcbiAgICAgIHNwYWNlc0NvdW50Kys7XG4gICAgfSBlbHNlIGlmIChjaGFyQ29kZSA9PT0gQ0hBUlMuVEFCKSB7XG4gICAgICB0YWJzQ291bnQrKztcbiAgICB9XG4gIH1cblxuICByZXR1cm4geyBzcGFjZXNDb3VudCwgdGFic0NvdW50IH07XG59XG4iXX0=