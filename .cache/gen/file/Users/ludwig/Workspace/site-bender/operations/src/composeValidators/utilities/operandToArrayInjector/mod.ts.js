import makeOperator from '../../../makeOperator/mod.ts';
export default function operandToArrayInjector(operand, separator = ',') {
    if (Array.isArray(operand)) {
        return () => ({
            datatype: 'array',
            value: operand,
        });
    }
    if (typeof operand === 'string') {
        return () => ({
            datatype: 'array',
            value: operand.split(separator),
        });
    }
    if ('value' in operand) {
        return operandToArrayInjector(operand.value, operand.separator);
    }
    if ('operatorType' in operand) {
        return makeOperator(operand);
    }
    return () => ({
        datatype: 'undefined',
        value: undefined,
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDhCQUE4QixDQUFBO0FBSXZELE1BQU0sQ0FBQyxPQUFPLFVBQVUsc0JBQXNCLENBQzdDLE9BQWdELEVBQ2hELFlBQTZCLEdBQUc7SUFFaEMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQzNCLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQztZQUNiLFFBQVEsRUFBRSxPQUFPO1lBQ2pCLEtBQUssRUFBRSxPQUFPO1NBQ2QsQ0FBQyxDQUFBO0tBQ0Y7SUFFRCxJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsRUFBRTtRQUNoQyxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDYixRQUFRLEVBQUUsT0FBTztZQUNqQixLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7U0FDL0IsQ0FBQyxDQUFBO0tBQ0Y7SUFFRCxJQUFJLE9BQU8sSUFBSSxPQUFPLEVBQUU7UUFDdkIsT0FBTyxzQkFBc0IsQ0FDNUIsT0FBTyxDQUFDLEtBQUssRUFDWixPQUFxQixDQUFDLFNBQVMsQ0FDaEMsQ0FBQTtLQUNEO0lBRUQsSUFBSSxjQUFjLElBQUksT0FBTyxFQUFFO1FBQzlCLE9BQU8sWUFBWSxDQUFDLE9BQW9CLENBQUMsQ0FBQTtLQUN6QztJQUVELE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNiLFFBQVEsRUFBRSxXQUFXO1FBQ3JCLEtBQUssRUFBRSxTQUFTO0tBQ2hCLENBQUMsQ0FBQTtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbWFrZU9wZXJhdG9yIGZyb20gJy4uLy4uLy4uL21ha2VPcGVyYXRvci9tb2QudHMnXG5pbXBvcnQgdHlwZSB7IE9wZXJhdGlvbiB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL29wZXJhdGlvbnMudHMnXG5pbXBvcnQgdHlwZSB7IEFycmF5cywgTGlzdFZhbHVlLCBWYWx1ZSB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL3ZhbHVlcy50cydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb3BlcmFuZFRvQXJyYXlJbmplY3Rvcihcblx0b3BlcmFuZDogc3RyaW5nIHwgT3BlcmF0aW9uIHwgTGlzdFZhbHVlIHwgQXJyYXlzLFxuXHRzZXBhcmF0b3I6IHN0cmluZyB8IFJlZ0V4cCA9ICcsJyxcbik6ICgpID0+IFZhbHVlIHtcblx0aWYgKEFycmF5LmlzQXJyYXkob3BlcmFuZCkpIHtcblx0XHRyZXR1cm4gKCkgPT4gKHtcblx0XHRcdGRhdGF0eXBlOiAnYXJyYXknLFxuXHRcdFx0dmFsdWU6IG9wZXJhbmQsXG5cdFx0fSlcblx0fVxuXG5cdGlmICh0eXBlb2Ygb3BlcmFuZCA9PT0gJ3N0cmluZycpIHtcblx0XHRyZXR1cm4gKCkgPT4gKHtcblx0XHRcdGRhdGF0eXBlOiAnYXJyYXknLFxuXHRcdFx0dmFsdWU6IG9wZXJhbmQuc3BsaXQoc2VwYXJhdG9yKSxcblx0XHR9KVxuXHR9XG5cblx0aWYgKCd2YWx1ZScgaW4gb3BlcmFuZCkge1xuXHRcdHJldHVybiBvcGVyYW5kVG9BcnJheUluamVjdG9yKFxuXHRcdFx0b3BlcmFuZC52YWx1ZSxcblx0XHRcdChvcGVyYW5kIGFzIExpc3RWYWx1ZSkuc2VwYXJhdG9yLFxuXHRcdClcblx0fVxuXG5cdGlmICgnb3BlcmF0b3JUeXBlJyBpbiBvcGVyYW5kKSB7XG5cdFx0cmV0dXJuIG1ha2VPcGVyYXRvcihvcGVyYW5kIGFzIE9wZXJhdGlvbilcblx0fVxuXG5cdHJldHVybiAoKSA9PiAoe1xuXHRcdGRhdGF0eXBlOiAndW5kZWZpbmVkJyxcblx0XHR2YWx1ZTogdW5kZWZpbmVkLFxuXHR9KVxufVxuIl19