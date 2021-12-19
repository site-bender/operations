import makeIsBoolean from './mod.ts';
import { TypeOfConstraint } from '../../../../types/enums.ts';
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts';
const constraint = {
    constraintType: TypeOfConstraint.IS_BOOLEAN,
};
Deno.test('[makeIsBoolean] returns correct validation when value is an boolean', () => {
    const validation = {
        datatype: 'boolean',
        value: true,
    };
    assertEquals(makeIsBoolean(constraint)(validation), validation);
});
Deno.test('[makeIsBoolean] returns error when value is not an boolean', () => {
    const validation = {
        datatype: 'boolean',
        value: undefined,
    };
    assertEquals(makeIsBoolean(constraint)(validation), {
        ...validation,
        isInvalid: true,
        errors: [
            {
                error: TypeOfConstraint.IS_BOOLEAN,
                constraint,
            },
        ],
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb2QudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLGFBQWEsTUFBTSxVQUFVLENBQUE7QUFLcEMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNEJBQTRCLENBQUE7QUFFN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtEQUFrRCxDQUFBO0FBRS9FLE1BQU0sVUFBVSxHQUE0QjtJQUMzQyxjQUFjLEVBQUUsZ0JBQWdCLENBQUMsVUFBVTtDQUMzQyxDQUFBO0FBRUQsSUFBSSxDQUFDLElBQUksQ0FDUixxRUFBcUUsRUFDckUsR0FBRyxFQUFFO0lBQ0osTUFBTSxVQUFVLEdBQWU7UUFDOUIsUUFBUSxFQUFFLFNBQVM7UUFDbkIsS0FBSyxFQUFFLElBQUk7S0FDWCxDQUFBO0lBRUQsWUFBWSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQTtBQUNoRSxDQUFDLENBQ0QsQ0FBQTtBQUVELElBQUksQ0FBQyxJQUFJLENBQUMsNERBQTRELEVBQUUsR0FBRyxFQUFFO0lBQzVFLE1BQU0sVUFBVSxHQUE4QjtRQUM3QyxRQUFRLEVBQUUsU0FBUztRQUVuQixLQUFLLEVBQUUsU0FBUztLQUNoQixDQUFBO0lBRUQsWUFBWSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUNuRCxHQUFHLFVBQVU7UUFDYixTQUFTLEVBQUUsSUFBSTtRQUNmLE1BQU0sRUFBRTtZQUNQO2dCQUNDLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxVQUFVO2dCQUNsQyxVQUFVO2FBQ1Y7U0FDRDtLQUNELENBQUMsQ0FBQTtBQUNILENBQUMsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1ha2VJc0Jvb2xlYW4gZnJvbSAnLi9tb2QudHMnXG5pbXBvcnQge1xuXHRUeXBlT2ZCb29sZWFuQ29uc3RyYWludCxcblx0VmFsaWRhdGlvbixcbn0gZnJvbSAnLi4vLi4vLi4vLi4vdHlwZXMvY29uc3RyYWludHMudHMnXG5pbXBvcnQgeyBUeXBlT2ZDb25zdHJhaW50IH0gZnJvbSAnLi4vLi4vLi4vLi4vdHlwZXMvZW51bXMudHMnXG5pbXBvcnQgdHlwZSB7IEJvb2xlYW5WYWx1ZSB9IGZyb20gJy4uLy4uLy4uLy4uL3R5cGVzL3ZhbHVlcy50cydcbmltcG9ydCB7IGFzc2VydEVxdWFscyB9IGZyb20gJ2h0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjExOC4wL3Rlc3RpbmcvYXNzZXJ0cy50cydcblxuY29uc3QgY29uc3RyYWludDogVHlwZU9mQm9vbGVhbkNvbnN0cmFpbnQgPSB7XG5cdGNvbnN0cmFpbnRUeXBlOiBUeXBlT2ZDb25zdHJhaW50LklTX0JPT0xFQU4sXG59XG5cbkRlbm8udGVzdChcblx0J1ttYWtlSXNCb29sZWFuXSByZXR1cm5zIGNvcnJlY3QgdmFsaWRhdGlvbiB3aGVuIHZhbHVlIGlzIGFuIGJvb2xlYW4nLFxuXHQoKSA9PiB7XG5cdFx0Y29uc3QgdmFsaWRhdGlvbjogVmFsaWRhdGlvbiA9IHtcblx0XHRcdGRhdGF0eXBlOiAnYm9vbGVhbicsXG5cdFx0XHR2YWx1ZTogdHJ1ZSxcblx0XHR9XG5cblx0XHRhc3NlcnRFcXVhbHMobWFrZUlzQm9vbGVhbihjb25zdHJhaW50KSh2YWxpZGF0aW9uKSwgdmFsaWRhdGlvbilcblx0fSxcbilcblxuRGVuby50ZXN0KCdbbWFrZUlzQm9vbGVhbl0gcmV0dXJucyBlcnJvciB3aGVuIHZhbHVlIGlzIG5vdCBhbiBib29sZWFuJywgKCkgPT4ge1xuXHRjb25zdCB2YWxpZGF0aW9uOiBWYWxpZGF0aW9uICYgQm9vbGVhblZhbHVlID0ge1xuXHRcdGRhdGF0eXBlOiAnYm9vbGVhbicsXG5cdFx0Ly8gQHRzLWlnbm9yZTogZm9yIHRlc3RpbmcgcHVycG9zZXNcblx0XHR2YWx1ZTogdW5kZWZpbmVkLFxuXHR9XG5cblx0YXNzZXJ0RXF1YWxzKG1ha2VJc0Jvb2xlYW4oY29uc3RyYWludCkodmFsaWRhdGlvbiksIHtcblx0XHQuLi52YWxpZGF0aW9uLFxuXHRcdGlzSW52YWxpZDogdHJ1ZSxcblx0XHRlcnJvcnM6IFtcblx0XHRcdHtcblx0XHRcdFx0ZXJyb3I6IFR5cGVPZkNvbnN0cmFpbnQuSVNfQk9PTEVBTixcblx0XHRcdFx0Y29uc3RyYWludCxcblx0XHRcdH0sXG5cdFx0XSxcblx0fSlcbn0pXG4iXX0=