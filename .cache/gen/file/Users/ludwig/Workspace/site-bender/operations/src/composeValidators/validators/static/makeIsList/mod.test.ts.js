import makeIsList from './mod.ts';
import { TypeOfConstraint } from '../../../../types/enums.ts';
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts';
const constraint = {
    constraintType: TypeOfConstraint.IS_LIST,
};
Deno.test('[makeIsList] returns correct validation when value is a list', () => {
    const validation = {
        datatype: 'list',
        value: [],
    };
    assertEquals(makeIsList(constraint)(validation), validation);
});
Deno.test('[makeIsList] returns error when value is not a list', () => {
    const validation = {
        datatype: 'list',
        value: 666,
    };
    assertEquals(makeIsList(constraint)(validation), {
        ...validation,
        isInvalid: true,
        errors: [
            {
                error: TypeOfConstraint.IS_LIST,
                constraint,
            },
        ],
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb2QudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFVBQVUsTUFBTSxVQUFVLENBQUE7QUFLakMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNEJBQTRCLENBQUE7QUFFN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtEQUFrRCxDQUFBO0FBRS9FLE1BQU0sVUFBVSxHQUF1QjtJQUN0QyxjQUFjLEVBQUUsZ0JBQWdCLENBQUMsT0FBTztDQUN4QyxDQUFBO0FBRUQsSUFBSSxDQUFDLElBQUksQ0FDUiw4REFBOEQsRUFDOUQsR0FBRyxFQUFFO0lBQ0osTUFBTSxVQUFVLEdBQWU7UUFDOUIsUUFBUSxFQUFFLE1BQU07UUFDaEIsS0FBSyxFQUFFLEVBQUU7S0FDVCxDQUFBO0lBRUQsWUFBWSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQTtBQUM3RCxDQUFDLENBQ0QsQ0FBQTtBQUVELElBQUksQ0FBQyxJQUFJLENBQUMscURBQXFELEVBQUUsR0FBRyxFQUFFO0lBQ3JFLE1BQU0sVUFBVSxHQUEyQjtRQUMxQyxRQUFRLEVBQUUsTUFBTTtRQUVoQixLQUFLLEVBQUUsR0FBRztLQUNWLENBQUE7SUFFRCxZQUFZLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQ2hELEdBQUcsVUFBVTtRQUNiLFNBQVMsRUFBRSxJQUFJO1FBQ2YsTUFBTSxFQUFFO1lBQ1A7Z0JBQ0MsS0FBSyxFQUFFLGdCQUFnQixDQUFDLE9BQU87Z0JBQy9CLFVBQVU7YUFDVjtTQUNEO0tBQ0QsQ0FBQyxDQUFBO0FBQ0gsQ0FBQyxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbWFrZUlzTGlzdCBmcm9tICcuL21vZC50cydcbmltcG9ydCB7XG5cdExpc3RUeXBlQ29uc3RyYWludCxcblx0VmFsaWRhdGlvbixcbn0gZnJvbSAnLi4vLi4vLi4vLi4vdHlwZXMvY29uc3RyYWludHMudHMnXG5pbXBvcnQgeyBUeXBlT2ZDb25zdHJhaW50IH0gZnJvbSAnLi4vLi4vLi4vLi4vdHlwZXMvZW51bXMudHMnXG5pbXBvcnQgdHlwZSB7IExpc3RWYWx1ZSB9IGZyb20gJy4uLy4uLy4uLy4uL3R5cGVzL3ZhbHVlcy50cydcbmltcG9ydCB7IGFzc2VydEVxdWFscyB9IGZyb20gJ2h0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjExOC4wL3Rlc3RpbmcvYXNzZXJ0cy50cydcblxuY29uc3QgY29uc3RyYWludDogTGlzdFR5cGVDb25zdHJhaW50ID0ge1xuXHRjb25zdHJhaW50VHlwZTogVHlwZU9mQ29uc3RyYWludC5JU19MSVNULFxufVxuXG5EZW5vLnRlc3QoXG5cdCdbbWFrZUlzTGlzdF0gcmV0dXJucyBjb3JyZWN0IHZhbGlkYXRpb24gd2hlbiB2YWx1ZSBpcyBhIGxpc3QnLFxuXHQoKSA9PiB7XG5cdFx0Y29uc3QgdmFsaWRhdGlvbjogVmFsaWRhdGlvbiA9IHtcblx0XHRcdGRhdGF0eXBlOiAnbGlzdCcsXG5cdFx0XHR2YWx1ZTogW10sXG5cdFx0fVxuXG5cdFx0YXNzZXJ0RXF1YWxzKG1ha2VJc0xpc3QoY29uc3RyYWludCkodmFsaWRhdGlvbiksIHZhbGlkYXRpb24pXG5cdH0sXG4pXG5cbkRlbm8udGVzdCgnW21ha2VJc0xpc3RdIHJldHVybnMgZXJyb3Igd2hlbiB2YWx1ZSBpcyBub3QgYSBsaXN0JywgKCkgPT4ge1xuXHRjb25zdCB2YWxpZGF0aW9uOiBWYWxpZGF0aW9uICYgTGlzdFZhbHVlID0ge1xuXHRcdGRhdGF0eXBlOiAnbGlzdCcsXG5cdFx0Ly8gQHRzLWlnbm9yZTogZm9yIHRlc3RpbmcgcHVycG9zZXNcblx0XHR2YWx1ZTogNjY2LFxuXHR9XG5cblx0YXNzZXJ0RXF1YWxzKG1ha2VJc0xpc3QoY29uc3RyYWludCkodmFsaWRhdGlvbiksIHtcblx0XHQuLi52YWxpZGF0aW9uLFxuXHRcdGlzSW52YWxpZDogdHJ1ZSxcblx0XHRlcnJvcnM6IFtcblx0XHRcdHtcblx0XHRcdFx0ZXJyb3I6IFR5cGVPZkNvbnN0cmFpbnQuSVNfTElTVCxcblx0XHRcdFx0Y29uc3RyYWludCxcblx0XHRcdH0sXG5cdFx0XSxcblx0fSlcbn0pXG4iXX0=