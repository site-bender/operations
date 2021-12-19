import notAfterAlphabetically from './mod.ts';
import { TypeOfConstraint } from '../../../../types/enums.ts';
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts';
const constraint = {
    constraintType: TypeOfConstraint.NOT_AFTER_ALPHABETICALLY,
    operand: 'bob',
};
Deno.test('[notAfterAlphabetically] returns correct validation if string comes before constraint value alphabetically', () => {
    const validation = {
        datatype: 'string',
        value: 'alice',
    };
    assertEquals(notAfterAlphabetically(constraint)(validation), validation);
});
Deno.test('[notAfterAlphabetically] returns correct validation if string and constraint value are alphabetically equal', () => {
    const validation = {
        datatype: 'string',
        value: 'BOB',
    };
    assertEquals(notAfterAlphabetically({
        ...constraint,
        options: {
            sensitivity: 'base',
        },
    })(validation), validation);
});
Deno.test('[notAfterAlphabetically] handles constraint with options', () => {
    const validation = {
        datatype: 'string',
        value: 'alice',
    };
    assertEquals(notAfterAlphabetically({
        ...constraint,
        language: 'fr',
        options: {
            sensitivity: 'accent',
        },
    })(validation), validation);
});
Deno.test('[notAfterAlphabetically] returns error if validation fails', () => {
    const validation = {
        datatype: 'string',
        value: 'carol',
    };
    assertEquals(notAfterAlphabetically(constraint)(validation), {
        ...validation,
        errors: [
            {
                constraint,
                error: TypeOfConstraint.NOT_AFTER_ALPHABETICALLY,
            },
        ],
        isInvalid: true,
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb2QudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLHNCQUFzQixNQUFNLFVBQVUsQ0FBQTtBQUs3QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQTtBQUM3RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0RBQWtELENBQUE7QUFFL0UsTUFBTSxVQUFVLEdBQXFDO0lBQ3BELGNBQWMsRUFBRSxnQkFBZ0IsQ0FBQyx3QkFBd0I7SUFDekQsT0FBTyxFQUFFLEtBQUs7Q0FDZCxDQUFBO0FBRUQsSUFBSSxDQUFDLElBQUksQ0FDUiw0R0FBNEcsRUFDNUcsR0FBRyxFQUFFO0lBQ0osTUFBTSxVQUFVLEdBQWU7UUFDOUIsUUFBUSxFQUFFLFFBQVE7UUFDbEIsS0FBSyxFQUFFLE9BQU87S0FDZCxDQUFBO0lBRUQsWUFBWSxDQUFDLHNCQUFzQixDQUFDLFVBQVUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFBO0FBQ3pFLENBQUMsQ0FDRCxDQUFBO0FBRUQsSUFBSSxDQUFDLElBQUksQ0FDUiw2R0FBNkcsRUFDN0csR0FBRyxFQUFFO0lBQ0osTUFBTSxVQUFVLEdBQWU7UUFDOUIsUUFBUSxFQUFFLFFBQVE7UUFDbEIsS0FBSyxFQUFFLEtBQUs7S0FDWixDQUFBO0lBRUQsWUFBWSxDQUNYLHNCQUFzQixDQUFDO1FBQ3RCLEdBQUcsVUFBVTtRQUNiLE9BQU8sRUFBRTtZQUNSLFdBQVcsRUFBRSxNQUFNO1NBQ25CO0tBQ0QsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUNkLFVBQVUsQ0FDVixDQUFBO0FBQ0YsQ0FBQyxDQUNELENBQUE7QUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLDBEQUEwRCxFQUFFLEdBQUcsRUFBRTtJQUMxRSxNQUFNLFVBQVUsR0FBZTtRQUM5QixRQUFRLEVBQUUsUUFBUTtRQUNsQixLQUFLLEVBQUUsT0FBTztLQUNkLENBQUE7SUFFRCxZQUFZLENBQ1gsc0JBQXNCLENBQUM7UUFDdEIsR0FBRyxVQUFVO1FBQ2IsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUU7WUFDUixXQUFXLEVBQUUsUUFBUTtTQUNyQjtLQUNELENBQUMsQ0FBQyxVQUFVLENBQUMsRUFDZCxVQUFVLENBQ1YsQ0FBQTtBQUNGLENBQUMsQ0FBQyxDQUFBO0FBRUYsSUFBSSxDQUFDLElBQUksQ0FBQyw0REFBNEQsRUFBRSxHQUFHLEVBQUU7SUFDNUUsTUFBTSxVQUFVLEdBQWU7UUFDOUIsUUFBUSxFQUFFLFFBQVE7UUFDbEIsS0FBSyxFQUFFLE9BQU87S0FDZCxDQUFBO0lBRUQsWUFBWSxDQUFDLHNCQUFzQixDQUFDLFVBQVUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQzVELEdBQUcsVUFBVTtRQUNiLE1BQU0sRUFBRTtZQUNQO2dCQUNDLFVBQVU7Z0JBQ1YsS0FBSyxFQUFFLGdCQUFnQixDQUFDLHdCQUF3QjthQUNoRDtTQUNEO1FBQ0QsU0FBUyxFQUFFLElBQUk7S0FDZixDQUFDLENBQUE7QUFDSCxDQUFDLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBub3RBZnRlckFscGhhYmV0aWNhbGx5IGZyb20gJy4vbW9kLnRzJ1xuaW1wb3J0IHtcblx0Tm90QWZ0ZXJBbHBoYWJldGljYWxseUNvbnN0cmFpbnQsXG5cdFZhbGlkYXRpb24sXG59IGZyb20gJy4uLy4uLy4uLy4uL3R5cGVzL2NvbnN0cmFpbnRzLnRzJ1xuaW1wb3J0IHsgVHlwZU9mQ29uc3RyYWludCB9IGZyb20gJy4uLy4uLy4uLy4uL3R5cGVzL2VudW1zLnRzJ1xuaW1wb3J0IHsgYXNzZXJ0RXF1YWxzIH0gZnJvbSAnaHR0cHM6Ly9kZW5vLmxhbmQvc3RkQDAuMTE4LjAvdGVzdGluZy9hc3NlcnRzLnRzJ1xuXG5jb25zdCBjb25zdHJhaW50OiBOb3RBZnRlckFscGhhYmV0aWNhbGx5Q29uc3RyYWludCA9IHtcblx0Y29uc3RyYWludFR5cGU6IFR5cGVPZkNvbnN0cmFpbnQuTk9UX0FGVEVSX0FMUEhBQkVUSUNBTExZLFxuXHRvcGVyYW5kOiAnYm9iJyxcbn1cblxuRGVuby50ZXN0KFxuXHQnW25vdEFmdGVyQWxwaGFiZXRpY2FsbHldIHJldHVybnMgY29ycmVjdCB2YWxpZGF0aW9uIGlmIHN0cmluZyBjb21lcyBiZWZvcmUgY29uc3RyYWludCB2YWx1ZSBhbHBoYWJldGljYWxseScsXG5cdCgpID0+IHtcblx0XHRjb25zdCB2YWxpZGF0aW9uOiBWYWxpZGF0aW9uID0ge1xuXHRcdFx0ZGF0YXR5cGU6ICdzdHJpbmcnLFxuXHRcdFx0dmFsdWU6ICdhbGljZScsXG5cdFx0fVxuXG5cdFx0YXNzZXJ0RXF1YWxzKG5vdEFmdGVyQWxwaGFiZXRpY2FsbHkoY29uc3RyYWludCkodmFsaWRhdGlvbiksIHZhbGlkYXRpb24pXG5cdH0sXG4pXG5cbkRlbm8udGVzdChcblx0J1tub3RBZnRlckFscGhhYmV0aWNhbGx5XSByZXR1cm5zIGNvcnJlY3QgdmFsaWRhdGlvbiBpZiBzdHJpbmcgYW5kIGNvbnN0cmFpbnQgdmFsdWUgYXJlIGFscGhhYmV0aWNhbGx5IGVxdWFsJyxcblx0KCkgPT4ge1xuXHRcdGNvbnN0IHZhbGlkYXRpb246IFZhbGlkYXRpb24gPSB7XG5cdFx0XHRkYXRhdHlwZTogJ3N0cmluZycsXG5cdFx0XHR2YWx1ZTogJ0JPQicsXG5cdFx0fVxuXG5cdFx0YXNzZXJ0RXF1YWxzKFxuXHRcdFx0bm90QWZ0ZXJBbHBoYWJldGljYWxseSh7XG5cdFx0XHRcdC4uLmNvbnN0cmFpbnQsXG5cdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRzZW5zaXRpdml0eTogJ2Jhc2UnLFxuXHRcdFx0XHR9LFxuXHRcdFx0fSkodmFsaWRhdGlvbiksXG5cdFx0XHR2YWxpZGF0aW9uLFxuXHRcdClcblx0fSxcbilcblxuRGVuby50ZXN0KCdbbm90QWZ0ZXJBbHBoYWJldGljYWxseV0gaGFuZGxlcyBjb25zdHJhaW50IHdpdGggb3B0aW9ucycsICgpID0+IHtcblx0Y29uc3QgdmFsaWRhdGlvbjogVmFsaWRhdGlvbiA9IHtcblx0XHRkYXRhdHlwZTogJ3N0cmluZycsXG5cdFx0dmFsdWU6ICdhbGljZScsXG5cdH1cblxuXHRhc3NlcnRFcXVhbHMoXG5cdFx0bm90QWZ0ZXJBbHBoYWJldGljYWxseSh7XG5cdFx0XHQuLi5jb25zdHJhaW50LFxuXHRcdFx0bGFuZ3VhZ2U6ICdmcicsXG5cdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdHNlbnNpdGl2aXR5OiAnYWNjZW50Jyxcblx0XHRcdH0sXG5cdFx0fSkodmFsaWRhdGlvbiksXG5cdFx0dmFsaWRhdGlvbixcblx0KVxufSlcblxuRGVuby50ZXN0KCdbbm90QWZ0ZXJBbHBoYWJldGljYWxseV0gcmV0dXJucyBlcnJvciBpZiB2YWxpZGF0aW9uIGZhaWxzJywgKCkgPT4ge1xuXHRjb25zdCB2YWxpZGF0aW9uOiBWYWxpZGF0aW9uID0ge1xuXHRcdGRhdGF0eXBlOiAnc3RyaW5nJyxcblx0XHR2YWx1ZTogJ2Nhcm9sJyxcblx0fVxuXG5cdGFzc2VydEVxdWFscyhub3RBZnRlckFscGhhYmV0aWNhbGx5KGNvbnN0cmFpbnQpKHZhbGlkYXRpb24pLCB7XG5cdFx0Li4udmFsaWRhdGlvbixcblx0XHRlcnJvcnM6IFtcblx0XHRcdHtcblx0XHRcdFx0Y29uc3RyYWludCxcblx0XHRcdFx0ZXJyb3I6IFR5cGVPZkNvbnN0cmFpbnQuTk9UX0FGVEVSX0FMUEhBQkVUSUNBTExZLFxuXHRcdFx0fSxcblx0XHRdLFxuXHRcdGlzSW52YWxpZDogdHJ1ZSxcblx0fSlcbn0pXG4iXX0=