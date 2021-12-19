import { CodeBlockWriter } from "../mod.deps.ts";
import { runTestDefinitions } from "./test_runner.ts";
export function getTestRunnerCode(options) {
    const writer = createWriter();
    writer.writeLine(`const chalk = require("chalk");`)
        .writeLine(`const process = require("process");`);
    if (options.testShimUsed) {
        writer.writeLine(`const { testDefinitions } = require("${options.shimPackageName}/test-internals");`);
    }
    writer.blankLine();
    writer.writeLine("const filePaths = [");
    writer.indent(() => {
        for (const entryPoint of options.testEntryPoints) {
            writer.quote(entryPoint.replace(/\.ts$/, ".js")).write(",").newLine();
        }
    });
    writer.writeLine("];").newLine();
    writer.write("async function main()").block(() => {
        writer.write("const testContext = ").inlineBlock(() => {
            writer.writeLine("process,");
            writer.writeLine("chalk,");
        }).write(";").newLine();
        writer.write("for (const [i, filePath] of filePaths.entries())")
            .block(() => {
            writer.write("if (i > 0)").block(() => {
                writer.writeLine(`console.log("");`);
            }).blankLine();
            if (options.includeCjs) {
                writer.writeLine(`const umdPath = "./umd/" + filePath;`);
                writer.writeLine(`console.log("Running tests in " + chalk.underline(umdPath) + "...\\n");`);
                writer.writeLine(`process.chdir(__dirname + "/umd");`);
                writer.writeLine(`require(umdPath);`);
                if (options.testShimUsed) {
                    writer.writeLine("await runTestDefinitions(testDefinitions.splice(0, testDefinitions.length), testContext);");
                }
                writer.blankLine();
            }
            writer.writeLine(`const esmPath = "./esm/" + filePath;`);
            writer.writeLine(`process.chdir(__dirname + "/esm");`);
            writer.writeLine(`console.log("\\nRunning tests in " + chalk.underline(esmPath) + "...\\n");`);
            writer.writeLine(`await import(esmPath);`);
            if (options.testShimUsed) {
                writer.writeLine("await runTestDefinitions(testDefinitions.splice(0, testDefinitions.length), testContext);");
            }
        });
    });
    writer.blankLine();
    if (options.testShimUsed) {
        writer.writeLine(`${getRunTestDefinitionsCode()}`);
        writer.blankLine();
    }
    writer.writeLine("main();");
    return writer.toString();
}
function getRunTestDefinitionsCode() {
    return runTestDefinitions.toString().replace("export async function", "async function");
}
function createWriter() {
    return new CodeBlockWriter({
        indentNumberOfSpaces: 2,
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0X3Rlc3RfcnVubmVyX2NvZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZXRfdGVzdF9ydW5uZXJfY29kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFdEQsTUFBTSxVQUFVLGlCQUFpQixDQUFDLE9BS2pDO0lBQ0MsTUFBTSxNQUFNLEdBQUcsWUFBWSxFQUFFLENBQUM7SUFDOUIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxpQ0FBaUMsQ0FBQztTQUNoRCxTQUFTLENBQUMscUNBQXFDLENBQUMsQ0FBQztJQUNwRCxJQUFJLE9BQU8sQ0FBQyxZQUFZLEVBQUU7UUFDeEIsTUFBTSxDQUFDLFNBQVMsQ0FDZCx3Q0FBd0MsT0FBTyxDQUFDLGVBQWUsb0JBQW9CLENBQ3BGLENBQUM7S0FDSDtJQUNELE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUVuQixNQUFNLENBQUMsU0FBUyxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDeEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7UUFDakIsS0FBSyxNQUFNLFVBQVUsSUFBSSxPQUFPLENBQUMsZUFBZSxFQUFFO1lBQ2hELE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDdkU7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUNILE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7SUFFakMsTUFBTSxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUU7UUFDL0MsTUFBTSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUU7WUFDcEQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM3QixNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN4QixNQUFNLENBQUMsS0FBSyxDQUFDLGtEQUFrRCxDQUFDO2FBQzdELEtBQUssQ0FBQyxHQUFHLEVBQUU7WUFDVixNQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUU7Z0JBQ3BDLE1BQU0sQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUN2QyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUVmLElBQUksT0FBTyxDQUFDLFVBQVUsRUFBRTtnQkFDdEIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO2dCQUN6RCxNQUFNLENBQUMsU0FBUyxDQUNkLHlFQUF5RSxDQUMxRSxDQUFDO2dCQUNGLE1BQU0sQ0FBQyxTQUFTLENBQUMsb0NBQW9DLENBQUMsQ0FBQztnQkFDdkQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2dCQUN0QyxJQUFJLE9BQU8sQ0FBQyxZQUFZLEVBQUU7b0JBQ3hCLE1BQU0sQ0FBQyxTQUFTLENBQ2QsMkZBQTJGLENBQzVGLENBQUM7aUJBQ0g7Z0JBQ0QsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO2FBQ3BCO1lBRUQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO1lBQ3pELE1BQU0sQ0FBQyxTQUFTLENBQUMsb0NBQW9DLENBQUMsQ0FBQztZQUN2RCxNQUFNLENBQUMsU0FBUyxDQUNkLDRFQUE0RSxDQUM3RSxDQUFDO1lBQ0YsTUFBTSxDQUFDLFNBQVMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1lBQzNDLElBQUksT0FBTyxDQUFDLFlBQVksRUFBRTtnQkFDeEIsTUFBTSxDQUFDLFNBQVMsQ0FDZCwyRkFBMkYsQ0FDNUYsQ0FBQzthQUNIO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUNILE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUVuQixJQUFJLE9BQU8sQ0FBQyxZQUFZLEVBQUU7UUFDeEIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLHlCQUF5QixFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ25ELE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztLQUNwQjtJQUVELE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDNUIsT0FBTyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDM0IsQ0FBQztBQUVELFNBQVMseUJBQXlCO0lBQ2hDLE9BQU8sa0JBQWtCLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUMxQyx1QkFBdUIsRUFDdkIsZ0JBQWdCLENBQ2pCLENBQUM7QUFDSixDQUFDO0FBRUQsU0FBUyxZQUFZO0lBQ25CLE9BQU8sSUFBSSxlQUFlLENBQUM7UUFDekIsb0JBQW9CLEVBQUUsQ0FBQztLQUN4QixDQUFDLENBQUM7QUFDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyMSB0aGUgRGVubyBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLiBNSVQgbGljZW5zZS5cblxuaW1wb3J0IHsgQ29kZUJsb2NrV3JpdGVyIH0gZnJvbSBcIi4uL21vZC5kZXBzLnRzXCI7XG5pbXBvcnQgeyBydW5UZXN0RGVmaW5pdGlvbnMgfSBmcm9tIFwiLi90ZXN0X3J1bm5lci50c1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGVzdFJ1bm5lckNvZGUob3B0aW9uczoge1xuICB0ZXN0RW50cnlQb2ludHM6IHN0cmluZ1tdO1xuICB0ZXN0U2hpbVVzZWQ6IGJvb2xlYW47XG4gIHNoaW1QYWNrYWdlTmFtZTogc3RyaW5nO1xuICBpbmNsdWRlQ2pzOiBib29sZWFuIHwgdW5kZWZpbmVkO1xufSkge1xuICBjb25zdCB3cml0ZXIgPSBjcmVhdGVXcml0ZXIoKTtcbiAgd3JpdGVyLndyaXRlTGluZShgY29uc3QgY2hhbGsgPSByZXF1aXJlKFwiY2hhbGtcIik7YClcbiAgICAud3JpdGVMaW5lKGBjb25zdCBwcm9jZXNzID0gcmVxdWlyZShcInByb2Nlc3NcIik7YCk7XG4gIGlmIChvcHRpb25zLnRlc3RTaGltVXNlZCkge1xuICAgIHdyaXRlci53cml0ZUxpbmUoXG4gICAgICBgY29uc3QgeyB0ZXN0RGVmaW5pdGlvbnMgfSA9IHJlcXVpcmUoXCIke29wdGlvbnMuc2hpbVBhY2thZ2VOYW1lfS90ZXN0LWludGVybmFsc1wiKTtgLFxuICAgICk7XG4gIH1cbiAgd3JpdGVyLmJsYW5rTGluZSgpO1xuXG4gIHdyaXRlci53cml0ZUxpbmUoXCJjb25zdCBmaWxlUGF0aHMgPSBbXCIpO1xuICB3cml0ZXIuaW5kZW50KCgpID0+IHtcbiAgICBmb3IgKGNvbnN0IGVudHJ5UG9pbnQgb2Ygb3B0aW9ucy50ZXN0RW50cnlQb2ludHMpIHtcbiAgICAgIHdyaXRlci5xdW90ZShlbnRyeVBvaW50LnJlcGxhY2UoL1xcLnRzJC8sIFwiLmpzXCIpKS53cml0ZShcIixcIikubmV3TGluZSgpO1xuICAgIH1cbiAgfSk7XG4gIHdyaXRlci53cml0ZUxpbmUoXCJdO1wiKS5uZXdMaW5lKCk7XG5cbiAgd3JpdGVyLndyaXRlKFwiYXN5bmMgZnVuY3Rpb24gbWFpbigpXCIpLmJsb2NrKCgpID0+IHtcbiAgICB3cml0ZXIud3JpdGUoXCJjb25zdCB0ZXN0Q29udGV4dCA9IFwiKS5pbmxpbmVCbG9jaygoKSA9PiB7XG4gICAgICB3cml0ZXIud3JpdGVMaW5lKFwicHJvY2VzcyxcIik7XG4gICAgICB3cml0ZXIud3JpdGVMaW5lKFwiY2hhbGssXCIpO1xuICAgIH0pLndyaXRlKFwiO1wiKS5uZXdMaW5lKCk7XG4gICAgd3JpdGVyLndyaXRlKFwiZm9yIChjb25zdCBbaSwgZmlsZVBhdGhdIG9mIGZpbGVQYXRocy5lbnRyaWVzKCkpXCIpXG4gICAgICAuYmxvY2soKCkgPT4ge1xuICAgICAgICB3cml0ZXIud3JpdGUoXCJpZiAoaSA+IDApXCIpLmJsb2NrKCgpID0+IHtcbiAgICAgICAgICB3cml0ZXIud3JpdGVMaW5lKGBjb25zb2xlLmxvZyhcIlwiKTtgKTtcbiAgICAgICAgfSkuYmxhbmtMaW5lKCk7XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuaW5jbHVkZUNqcykge1xuICAgICAgICAgIHdyaXRlci53cml0ZUxpbmUoYGNvbnN0IHVtZFBhdGggPSBcIi4vdW1kL1wiICsgZmlsZVBhdGg7YCk7XG4gICAgICAgICAgd3JpdGVyLndyaXRlTGluZShcbiAgICAgICAgICAgIGBjb25zb2xlLmxvZyhcIlJ1bm5pbmcgdGVzdHMgaW4gXCIgKyBjaGFsay51bmRlcmxpbmUodW1kUGF0aCkgKyBcIi4uLlxcXFxuXCIpO2AsXG4gICAgICAgICAgKTtcbiAgICAgICAgICB3cml0ZXIud3JpdGVMaW5lKGBwcm9jZXNzLmNoZGlyKF9fZGlybmFtZSArIFwiL3VtZFwiKTtgKTtcbiAgICAgICAgICB3cml0ZXIud3JpdGVMaW5lKGByZXF1aXJlKHVtZFBhdGgpO2ApO1xuICAgICAgICAgIGlmIChvcHRpb25zLnRlc3RTaGltVXNlZCkge1xuICAgICAgICAgICAgd3JpdGVyLndyaXRlTGluZShcbiAgICAgICAgICAgICAgXCJhd2FpdCBydW5UZXN0RGVmaW5pdGlvbnModGVzdERlZmluaXRpb25zLnNwbGljZSgwLCB0ZXN0RGVmaW5pdGlvbnMubGVuZ3RoKSwgdGVzdENvbnRleHQpO1wiLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgd3JpdGVyLmJsYW5rTGluZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgd3JpdGVyLndyaXRlTGluZShgY29uc3QgZXNtUGF0aCA9IFwiLi9lc20vXCIgKyBmaWxlUGF0aDtgKTtcbiAgICAgICAgd3JpdGVyLndyaXRlTGluZShgcHJvY2Vzcy5jaGRpcihfX2Rpcm5hbWUgKyBcIi9lc21cIik7YCk7XG4gICAgICAgIHdyaXRlci53cml0ZUxpbmUoXG4gICAgICAgICAgYGNvbnNvbGUubG9nKFwiXFxcXG5SdW5uaW5nIHRlc3RzIGluIFwiICsgY2hhbGsudW5kZXJsaW5lKGVzbVBhdGgpICsgXCIuLi5cXFxcblwiKTtgLFxuICAgICAgICApO1xuICAgICAgICB3cml0ZXIud3JpdGVMaW5lKGBhd2FpdCBpbXBvcnQoZXNtUGF0aCk7YCk7XG4gICAgICAgIGlmIChvcHRpb25zLnRlc3RTaGltVXNlZCkge1xuICAgICAgICAgIHdyaXRlci53cml0ZUxpbmUoXG4gICAgICAgICAgICBcImF3YWl0IHJ1blRlc3REZWZpbml0aW9ucyh0ZXN0RGVmaW5pdGlvbnMuc3BsaWNlKDAsIHRlc3REZWZpbml0aW9ucy5sZW5ndGgpLCB0ZXN0Q29udGV4dCk7XCIsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH0pO1xuICB3cml0ZXIuYmxhbmtMaW5lKCk7XG5cbiAgaWYgKG9wdGlvbnMudGVzdFNoaW1Vc2VkKSB7XG4gICAgd3JpdGVyLndyaXRlTGluZShgJHtnZXRSdW5UZXN0RGVmaW5pdGlvbnNDb2RlKCl9YCk7XG4gICAgd3JpdGVyLmJsYW5rTGluZSgpO1xuICB9XG5cbiAgd3JpdGVyLndyaXRlTGluZShcIm1haW4oKTtcIik7XG4gIHJldHVybiB3cml0ZXIudG9TdHJpbmcoKTtcbn1cblxuZnVuY3Rpb24gZ2V0UnVuVGVzdERlZmluaXRpb25zQ29kZSgpIHtcbiAgcmV0dXJuIHJ1blRlc3REZWZpbml0aW9ucy50b1N0cmluZygpLnJlcGxhY2UoXG4gICAgXCJleHBvcnQgYXN5bmMgZnVuY3Rpb25cIixcbiAgICBcImFzeW5jIGZ1bmN0aW9uXCIsXG4gICk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVdyaXRlcigpIHtcbiAgcmV0dXJuIG5ldyBDb2RlQmxvY2tXcml0ZXIoe1xuICAgIGluZGVudE51bWJlck9mU3BhY2VzOiAyLFxuICB9KTtcbn1cbiJdfQ==