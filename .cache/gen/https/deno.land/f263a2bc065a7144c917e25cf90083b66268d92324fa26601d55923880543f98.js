export async function runTestDefinitions(testDefinitions, options) {
    const testFailures = [];
    for (const definition of testDefinitions) {
        options.process.stdout.write("test " + definition.name + " ...");
        if (definition.ignored) {
            options.process.stdout.write(` ${options.chalk.gray("ignored")}\n`);
            continue;
        }
        const context = getTestContext();
        let pass = false;
        try {
            await definition.fn(context);
            if (context.hasFailingChild) {
                testFailures.push({
                    name: definition.name,
                    err: new Error("Had failing test step."),
                });
            }
            else {
                pass = true;
            }
        }
        catch (err) {
            testFailures.push({ name: definition.name, err });
        }
        const testStepOutput = context.getOutput();
        if (testStepOutput.length > 0) {
            options.process.stdout.write(testStepOutput);
        }
        else {
            options.process.stdout.write(" ");
        }
        options.process.stdout.write(getStatusText(pass ? "ok" : "fail"));
        options.process.stdout.write("\n");
    }
    if (testFailures.length > 0) {
        options.process.stdout.write("\nFAILURES");
        for (const failure of testFailures) {
            options.process.stdout.write("\n\n");
            options.process.stdout.write(failure.name + "\n");
            options.process.stdout.write(indentText((failure.err?.stack ?? failure.err).toString(), 1));
        }
        options.process.exit(1);
    }
    function getTestContext() {
        return {
            name: undefined,
            err: undefined,
            status: "ok",
            children: [],
            get hasFailingChild() {
                return this.children.some((c) => c.status === "fail" || c.status === "pending");
            },
            getOutput() {
                let output = "";
                if (this.name) {
                    output += "test " + this.name + " ...";
                }
                if (this.children.length > 0) {
                    output += "\n" + this.children.map((c) => indentText(c.getOutput(), 1)).join("\n") + "\n";
                }
                else if (!this.err) {
                    output += " ";
                }
                if (this.name && this.err) {
                    output += "\n";
                }
                if (this.err) {
                    output += indentText((this.err.stack ?? this.err).toString(), 1);
                    if (this.name) {
                        output += "\n";
                    }
                }
                if (this.name) {
                    output += getStatusText(this.status);
                }
                return output;
            },
            async step(nameOrTestDefinition, fn) {
                const definition = getDefinition();
                const context = getTestContext();
                context.status = "pending";
                context.name = definition.name;
                context.status = "pending";
                this.children.push(context);
                if (definition.ignored) {
                    context.status = "ignored";
                    return false;
                }
                try {
                    await definition.fn(context);
                    context.status = "ok";
                    if (context.hasFailingChild) {
                        context.status = "fail";
                        return false;
                    }
                    return true;
                }
                catch (err) {
                    context.status = "fail";
                    context.err = err;
                    return false;
                }
                function getDefinition() {
                    if (typeof nameOrTestDefinition === "string") {
                        if (!(fn instanceof Function)) {
                            throw new TypeError("Expected function for second argument.");
                        }
                        return {
                            name: nameOrTestDefinition,
                            fn,
                        };
                    }
                    else if (typeof nameOrTestDefinition === "object") {
                        return nameOrTestDefinition;
                    }
                    else {
                        throw new TypeError("Expected a test definition or name and function.");
                    }
                }
            },
        };
    }
    function getStatusText(status) {
        switch (status) {
            case "ok":
                return options.chalk.green(status);
            case "fail":
            case "pending":
                return options.chalk.red(status);
            case "ignored":
                return options.chalk.gray(status);
            default: {
                const _assertNever = status;
                return status;
            }
        }
    }
    function indentText(text, indentLevel) {
        if (text === undefined) {
            text = "[undefined]";
        }
        else if (text === null) {
            text = "[null]";
        }
        else {
            text = text.toString();
        }
        return text.split(/\r?\n/)
            .map((line) => "  ".repeat(indentLevel) + line)
            .join("\n");
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdF9ydW5uZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0ZXN0X3J1bm5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF1Q0EsTUFBTSxDQUFDLEtBQUssVUFBVSxrQkFBa0IsQ0FDdEMsZUFBaUMsRUFDakMsT0FBa0M7SUFFbEMsTUFBTSxZQUFZLEdBQUcsRUFBRSxDQUFDO0lBQ3hCLEtBQUssTUFBTSxVQUFVLElBQUksZUFBZSxFQUFFO1FBQ3hDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsQ0FBQztRQUNqRSxJQUFJLFVBQVUsQ0FBQyxPQUFPLEVBQUU7WUFDdEIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3BFLFNBQVM7U0FDVjtRQUNELE1BQU0sT0FBTyxHQUFHLGNBQWMsRUFBRSxDQUFDO1FBQ2pDLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQztRQUNqQixJQUFJO1lBQ0YsTUFBTSxVQUFVLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzdCLElBQUksT0FBTyxDQUFDLGVBQWUsRUFBRTtnQkFDM0IsWUFBWSxDQUFDLElBQUksQ0FBQztvQkFDaEIsSUFBSSxFQUFFLFVBQVUsQ0FBQyxJQUFJO29CQUNyQixHQUFHLEVBQUUsSUFBSSxLQUFLLENBQUMsd0JBQXdCLENBQUM7aUJBQ3pDLENBQUMsQ0FBQzthQUNKO2lCQUFNO2dCQUNMLElBQUksR0FBRyxJQUFJLENBQUM7YUFDYjtTQUNGO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztTQUNuRDtR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QztTQUN0QjthQUFNLElBQUksSUFBSSxLQUFLLElBQUksRUFBRTtZQUN4QixJQUFJLEdBQUcsUUFBUSxDQUFDO1NBQ2pCO2FBQU07WUFDTCxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ3hCO1FBQ0QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQzthQUN2QixHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsSUFBSSxDQUFDO2FBQzlDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQixDQUFDO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE4LTIwMjEgdGhlIERlbm8gYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC4gTUlUIGxpY2Vuc2UuXG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2hhbGsge1xuICBncmVlbih0ZXh0OiBzdHJpbmcpOiBzdHJpbmc7XG4gIHJlZCh0ZXh0OiBzdHJpbmcpOiBzdHJpbmc7XG4gIGdyYXkodGV4dDogc3RyaW5nKTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE5vZGVQcm9jZXNzIHtcbiAgc3Rkb3V0OiB7XG4gICAgd3JpdGUodGV4dDogc3RyaW5nKTogdm9pZDtcbiAgfTtcbiAgZXhpdChjb2RlOiBudW1iZXIpOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUnVuVGVzdERlZmluaXRpb25zT3B0aW9ucyB7XG4gIGNoYWxrOiBDaGFsaztcbiAgcHJvY2VzczogTm9kZVByb2Nlc3M7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGVzdERlZmluaXRpb24ge1xuICBuYW1lOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIGZuOiAoY29udGV4dDogVGVzdENvbnRleHQpID0+IChQcm9taXNlPHZvaWQ+IHwgdm9pZCk7XG4gIGlnbm9yZWQ/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRlc3RDb250ZXh0IHtcbiAgbmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBlcnI6IGFueTtcbiAgY2hpbGRyZW46IFRlc3RDb250ZXh0W107XG4gIGhhc0ZhaWxpbmdDaGlsZDogYm9vbGVhbjtcbiAgZ2V0T3V0cHV0KCk6IHN0cmluZztcbiAgc3RlcChcbiAgICBuYW1lT3JEZWZpbml0aW9uOiBzdHJpbmcgfCBUZXN0RGVmaW5pdGlvbixcbiAgICBmbj86IChjb250ZXh0OiBUZXN0Q29udGV4dCkgPT4gKHZvaWQgfCBQcm9taXNlPHZvaWQ+KSxcbiAgKTogUHJvbWlzZTxib29sZWFuPjtcbiAgc3RhdHVzOiBcIm9rXCIgfCBcImZhaWxcIiB8IFwicGVuZGluZ1wiIHwgXCJpZ25vcmVkXCI7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBydW5UZXN0RGVmaW5pdGlvbnMoXG4gIHRlc3REZWZpbml0aW9uczogVGVzdERlZmluaXRpb25bXSxcbiAgb3B0aW9uczogUnVuVGVzdERlZmluaXRpb25zT3B0aW9ucyxcbikge1xuICBjb25zdCB0ZXN0RmFpbHVyZXMgPSBbXTtcbiAgZm9yIChjb25zdCBkZWZpbml0aW9uIG9mIHRlc3REZWZpbml0aW9ucykge1xuICAgIG9wdGlvbnMucHJvY2Vzcy5zdGRvdXQud3JpdGUoXCJ0ZXN0IFwiICsgZGVmaW5pdGlvbi5uYW1lICsgXCIgLi4uXCIpO1xuICAgIGlmIChkZWZpbml0aW9uLmlnbm9yZWQpIHtcbiAgICAgIG9wdGlvbnMucHJvY2Vzcy5zdGRvdXQud3JpdGUoYCAke29wdGlvbnMuY2hhbGsuZ3JheShcImlnbm9yZWRcIil9XFxuYCk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgY29uc3QgY29udGV4dCA9IGdldFRlc3RDb250ZXh0KCk7XG4gICAgbGV0IHBhc3MgPSBmYWxzZTtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgZGVmaW5pdGlvbi5mbihjb250ZXh0KTtcbiAgICAgIGlmIChjb250ZXh0Lmhhc0ZhaWxpbmdDaGlsZCkge1xuICAgICAgICB0ZXN0RmFpbHVyZXMucHVzaCh7XG4gICAgICAgICAgbmFtZTogZGVmaW5pdGlvbi5uYW1lLFxuICAgICAgICAgIGVycjogbmV3IEVycm9yKFwiSGFkIGZhaWxpbmcgdGVzdCBzdGVwLlwiKSxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXNzID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRlc3RGYWlsdXJlcy5wdXNoKHsgbmFtZTogZGVmaW5pdGlvbi5uYW1lLCBlcnIgfSk7XG4gICAgfVxuICAgIGNvbnN0IHRlc3RTdGVwT3V0cHV0ID0gY29udGV4dC5nZXRPdXRwdXQoKTtcbiAgICBpZiAodGVzdFN0ZXBPdXRwdXQubGVuZ3RoID4gMCkge1xuICAgICAgb3B0aW9ucy5wcm9jZXNzLnN0ZG91dC53cml0ZSh0ZXN0U3RlcE91dHB1dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9wdGlvbnMucHJvY2Vzcy5zdGRvdXQud3JpdGUoXCIgXCIpO1xuICAgIH1cbiAgICBvcHRpb25zLnByb2Nlc3Muc3Rkb3V0LndyaXRlKGdldFN0YXR1c1RleHQocGFzcyA/IFwib2tcIiA6IFwiZmFpbFwiKSk7XG4gICAgb3B0aW9ucy5wcm9jZXNzLnN0ZG91dC53cml0ZShcIlxcblwiKTtcbiAgfVxuXG4gIGlmICh0ZXN0RmFpbHVyZXMubGVuZ3RoID4gMCkge1xuICAgIG9wdGlvbnMucHJvY2Vzcy5zdGRvdXQud3JpdGUoXCJcXG5GQUlMVVJFU1wiKTtcbiAgICBmb3IgKGNvbnN0IGZhaWx1cmUgb2YgdGVzdEZhaWx1cmVzKSB7XG4gICAgICBvcHRpb25zLnByb2Nlc3Muc3Rkb3V0LndyaXRlKFwiXFxuXFxuXCIpO1xuICAgICAgb3B0aW9ucy5wcm9jZXNzLnN0ZG91dC53cml0ZShmYWlsdXJlLm5hbWUgKyBcIlxcblwiKTtcbiAgICAgIG9wdGlvbnMucHJvY2Vzcy5zdGRvdXQud3JpdGUoXG4gICAgICAgIGluZGVudFRleHQoKGZhaWx1cmUuZXJyPy5zdGFjayA/PyBmYWlsdXJlLmVycikudG9TdHJpbmcoKSwgMSksXG4gICAgICApO1xuICAgIH1cbiAgICBvcHRpb25zLnByb2Nlc3MuZXhpdCgxKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFRlc3RDb250ZXh0KCk6IFRlc3RDb250ZXh0IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogdW5kZWZpbmVkLFxuICAgICAgLyoqIEB0eXBlIHthbnl9ICovXG4gICAgICBlcnI6IHVuZGVmaW5lZCxcbiAgICAgIHN0YXR1czogXCJva1wiLFxuICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgZ2V0IGhhc0ZhaWxpbmdDaGlsZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW4uc29tZSgoYykgPT5cbiAgICAgICAgICBjLnN0YXR1cyA9PT0gXCJmYWlsXCIgfHwgYy5zdGF0dXMgPT09IFwicGVuZGluZ1wiXG4gICAgICAgICk7XG4gICAgICB9LFxuICAgICAgZ2V0T3V0cHV0KCkge1xuICAgICAgICBsZXQgb3V0cHV0ID0gXCJcIjtcbiAgICAgICAgaWYgKHRoaXMubmFtZSkge1xuICAgICAgICAgIG91dHB1dCArPSBcInRlc3QgXCIgKyB0aGlzLm5hbWUgKyBcIiAuLi5cIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgb3V0cHV0ICs9IFwiXFxuXCIgKyB0aGlzLmNoaWxkcmVuLm1hcCgoYykgPT5cbiAgICAgICAgICAgIGluZGVudFRleHQoYy5nZXRPdXRwdXQoKSwgMSlcbiAgICAgICAgICApLmpvaW4oXCJcXG5cIikgKyBcIlxcblwiO1xuICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLmVycikge1xuICAgICAgICAgIG91dHB1dCArPSBcIiBcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5uYW1lICYmIHRoaXMuZXJyKSB7XG4gICAgICAgICAgb3V0cHV0ICs9IFwiXFxuXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZXJyKSB7XG4gICAgICAgICAgb3V0cHV0ICs9IGluZGVudFRleHQoKHRoaXMuZXJyLnN0YWNrID8/IHRoaXMuZXJyKS50b1N0cmluZygpLCAxKTtcbiAgICAgICAgICBpZiAodGhpcy5uYW1lKSB7XG4gICAgICAgICAgICBvdXRwdXQgKz0gXCJcXG5cIjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubmFtZSkge1xuICAgICAgICAgIG91dHB1dCArPSBnZXRTdGF0dXNUZXh0KHRoaXMuc3RhdHVzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgICAgfSxcbiAgICAgIGFzeW5jIHN0ZXAobmFtZU9yVGVzdERlZmluaXRpb24sIGZuKSB7XG4gICAgICAgIGNvbnN0IGRlZmluaXRpb24gPSBnZXREZWZpbml0aW9uKCk7XG5cbiAgICAgICAgY29uc3QgY29udGV4dCA9IGdldFRlc3RDb250ZXh0KCk7XG4gICAgICAgIGNvbnRleHQuc3RhdHVzID0gXCJwZW5kaW5nXCI7XG4gICAgICAgIGNvbnRleHQubmFtZSA9IGRlZmluaXRpb24ubmFtZTtcbiAgICAgICAgY29udGV4dC5zdGF0dXMgPSBcInBlbmRpbmdcIjtcbiAgICAgICAgdGhpcy5jaGlsZHJlbi5wdXNoKGNvbnRleHQpO1xuXG4gICAgICAgIGlmIChkZWZpbml0aW9uLmlnbm9yZWQpIHtcbiAgICAgICAgICBjb250ZXh0LnN0YXR1cyA9IFwiaWdub3JlZFwiO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgYXdhaXQgZGVmaW5pdGlvbi5mbihjb250ZXh0KTtcbiAgICAgICAgICBjb250ZXh0LnN0YXR1cyA9IFwib2tcIjtcbiAgICAgICAgICBpZiAoY29udGV4dC5oYXNGYWlsaW5nQ2hpbGQpIHtcbiAgICAgICAgICAgIGNvbnRleHQuc3RhdHVzID0gXCJmYWlsXCI7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBjb250ZXh0LnN0YXR1cyA9IFwiZmFpbFwiO1xuICAgICAgICAgIGNvbnRleHQuZXJyID0gZXJyO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKiBAcmV0dXJucyB7VGVzdERlZmluaXRpb259ICovXG4gICAgICAgIGZ1bmN0aW9uIGdldERlZmluaXRpb24oKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBuYW1lT3JUZXN0RGVmaW5pdGlvbiA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgaWYgKCEoZm4gaW5zdGFuY2VvZiBGdW5jdGlvbikpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkV4cGVjdGVkIGZ1bmN0aW9uIGZvciBzZWNvbmQgYXJndW1lbnQuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgbmFtZTogbmFtZU9yVGVzdERlZmluaXRpb24sXG4gICAgICAgICAgICAgIGZuLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBuYW1lT3JUZXN0RGVmaW5pdGlvbiA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgcmV0dXJuIG5hbWVPclRlc3REZWZpbml0aW9uO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgICAgICBcIkV4cGVjdGVkIGEgdGVzdCBkZWZpbml0aW9uIG9yIG5hbWUgYW5kIGZ1bmN0aW9uLlwiLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFN0YXR1c1RleHQoc3RhdHVzOiBUZXN0Q29udGV4dFtcInN0YXR1c1wiXSkge1xuICAgIHN3aXRjaCAoc3RhdHVzKSB7XG4gICAgICBjYXNlIFwib2tcIjpcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMuY2hhbGsuZ3JlZW4oc3RhdHVzKTtcbiAgICAgIGNhc2UgXCJmYWlsXCI6XG4gICAgICBjYXNlIFwicGVuZGluZ1wiOlxuICAgICAgICByZXR1cm4gb3B0aW9ucy5jaGFsay5yZWQoc3RhdHVzKTtcbiAgICAgIGNhc2UgXCJpZ25vcmVkXCI6XG4gICAgICAgIHJldHVybiBvcHRpb25zLmNoYWxrLmdyYXkoc3RhdHVzKTtcbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgY29uc3QgX2Fzc2VydE5ldmVyOiBuZXZlciA9IHN0YXR1cztcbiAgICAgICAgcmV0dXJuIHN0YXR1cztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpbmRlbnRUZXh0KHRleHQ6IHN0cmluZywgaW5kZW50TGV2ZWw6IG51bWJlcikge1xuICAgIGlmICh0ZXh0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRleHQgPSBcIlt1bmRlZmluZWRdXCI7XG4gICAgfSBlbHNlIGlmICh0ZXh0ID09PSBudWxsKSB7XG4gICAgICB0ZXh0ID0gXCJbbnVsbF1cIjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGV4dCA9IHRleHQudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRleHQuc3BsaXQoL1xccj9cXG4vKVxuICAgICAgLm1hcCgobGluZSkgPT4gXCIgIFwiLnJlcGVhdChpbmRlbnRMZXZlbCkgKyBsaW5lKVxuICAgICAgLmpvaW4oXCJcXG5cIik7XG4gIH1cbn1cbiJdfQ==