import makeIsMonthDay from './mod.ts';
import { TypeOfConstraint } from '../../../../types/enums.ts';
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts';
const constraint = {
    constraintType: TypeOfConstraint.IS_MONTH_DAY,
};
Deno.test('[makeIsMonthDay] returns correct validation when value is a date', () => {
    const validation = {
        datatype: 'monthDay',
        value: '2000-01-01',
    };
    assertEquals(makeIsMonthDay(constraint)(validation), validation);
});
Deno.test('[makeIsMonthDay] returns error when value is not a date', () => {
    const validation = {
        datatype: 'monthDay',
        value: 666,
    };
    assertEquals(makeIsMonthDay(constraint)(validation), {
        ...validation,
        isInvalid: true,
        errors: [
            {
                error: TypeOfConstraint.IS_MONTH_DAY,
                constraint,
                errorMessage: 'RangeError: invalid ISO 8601 string: 666',
            },
        ],
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb2QudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLGNBQWMsTUFBTSxVQUFVLENBQUE7QUFLckMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNEJBQTRCLENBQUE7QUFFN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtEQUFrRCxDQUFBO0FBRS9FLE1BQU0sVUFBVSxHQUF1QjtJQUN0QyxjQUFjLEVBQUUsZ0JBQWdCLENBQUMsWUFBWTtDQUM3QyxDQUFBO0FBRUQsSUFBSSxDQUFDLElBQUksQ0FDUixrRUFBa0UsRUFDbEUsR0FBRyxFQUFFO0lBQ0osTUFBTSxVQUFVLEdBQWU7UUFDOUIsUUFBUSxFQUFFLFVBQVU7UUFDcEIsS0FBSyxFQUFFLFlBQVk7S0FDbkIsQ0FBQTtJQUVELFlBQVksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUE7QUFDakUsQ0FBQyxDQUNELENBQUE7QUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLHlEQUF5RCxFQUFFLEdBQUcsRUFBRTtJQUN6RSxNQUFNLFVBQVUsR0FBK0I7UUFDOUMsUUFBUSxFQUFFLFVBQVU7UUFFcEIsS0FBSyxFQUFFLEdBQUc7S0FDVixDQUFBO0lBRUQsWUFBWSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUNwRCxHQUFHLFVBQVU7UUFDYixTQUFTLEVBQUUsSUFBSTtRQUNmLE1BQU0sRUFBRTtZQUNQO2dCQUNDLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxZQUFZO2dCQUNwQyxVQUFVO2dCQUNWLFlBQVksRUFBRSwwQ0FBMEM7YUFDeEQ7U0FDRDtLQUNELENBQUMsQ0FBQTtBQUNILENBQUMsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1ha2VJc01vbnRoRGF5IGZyb20gJy4vbW9kLnRzJ1xuaW1wb3J0IHtcblx0TW9udGhEYXlDb25zdHJhaW50LFxuXHRWYWxpZGF0aW9uLFxufSBmcm9tICcuLi8uLi8uLi8uLi90eXBlcy9jb25zdHJhaW50cy50cydcbmltcG9ydCB7IFR5cGVPZkNvbnN0cmFpbnQgfSBmcm9tICcuLi8uLi8uLi8uLi90eXBlcy9lbnVtcy50cydcbmltcG9ydCB0eXBlIHsgTW9udGhEYXlWYWx1ZSB9IGZyb20gJy4uLy4uLy4uLy4uL3R5cGVzL3ZhbHVlcy50cydcbmltcG9ydCB7IGFzc2VydEVxdWFscyB9IGZyb20gJ2h0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjExOC4wL3Rlc3RpbmcvYXNzZXJ0cy50cydcblxuY29uc3QgY29uc3RyYWludDogTW9udGhEYXlDb25zdHJhaW50ID0ge1xuXHRjb25zdHJhaW50VHlwZTogVHlwZU9mQ29uc3RyYWludC5JU19NT05USF9EQVksXG59XG5cbkRlbm8udGVzdChcblx0J1ttYWtlSXNNb250aERheV0gcmV0dXJucyBjb3JyZWN0IHZhbGlkYXRpb24gd2hlbiB2YWx1ZSBpcyBhIGRhdGUnLFxuXHQoKSA9PiB7XG5cdFx0Y29uc3QgdmFsaWRhdGlvbjogVmFsaWRhdGlvbiA9IHtcblx0XHRcdGRhdGF0eXBlOiAnbW9udGhEYXknLFxuXHRcdFx0dmFsdWU6ICcyMDAwLTAxLTAxJyxcblx0XHR9XG5cblx0XHRhc3NlcnRFcXVhbHMobWFrZUlzTW9udGhEYXkoY29uc3RyYWludCkodmFsaWRhdGlvbiksIHZhbGlkYXRpb24pXG5cdH0sXG4pXG5cbkRlbm8udGVzdCgnW21ha2VJc01vbnRoRGF5XSByZXR1cm5zIGVycm9yIHdoZW4gdmFsdWUgaXMgbm90IGEgZGF0ZScsICgpID0+IHtcblx0Y29uc3QgdmFsaWRhdGlvbjogVmFsaWRhdGlvbiAmIE1vbnRoRGF5VmFsdWUgPSB7XG5cdFx0ZGF0YXR5cGU6ICdtb250aERheScsXG5cdFx0Ly8gQHRzLWlnbm9yZTogZm9yIHRlc3RpbmcgcHVycG9zZXNcblx0XHR2YWx1ZTogNjY2LFxuXHR9XG5cblx0YXNzZXJ0RXF1YWxzKG1ha2VJc01vbnRoRGF5KGNvbnN0cmFpbnQpKHZhbGlkYXRpb24pLCB7XG5cdFx0Li4udmFsaWRhdGlvbixcblx0XHRpc0ludmFsaWQ6IHRydWUsXG5cdFx0ZXJyb3JzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdGVycm9yOiBUeXBlT2ZDb25zdHJhaW50LklTX01PTlRIX0RBWSxcblx0XHRcdFx0Y29uc3RyYWludCxcblx0XHRcdFx0ZXJyb3JNZXNzYWdlOiAnUmFuZ2VFcnJvcjogaW52YWxpZCBJU08gODYwMSBzdHJpbmc6IDY2NicsXG5cdFx0XHR9LFxuXHRcdF0sXG5cdH0pXG59KVxuIl19