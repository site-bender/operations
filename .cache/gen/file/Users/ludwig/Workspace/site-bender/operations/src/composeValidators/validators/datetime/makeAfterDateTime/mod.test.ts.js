import { Temporal } from 'https://cdn.skypack.dev/@js-temporal/polyfill?dts';
import afterDateTime from './mod.ts';
import { TypeOfConstraint } from '../../../../types/enums.ts';
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts';
const constraint = {
    constraintType: TypeOfConstraint.AFTER_DATE_TIME,
    operand: {
        datatype: 'plainDateTime',
        value: Temporal.PlainDateTime.from({
            year: 2021,
            month: 1,
            day: 1,
            hour: 12,
        }),
    },
};
Deno.test('[afterDateTime] returns correct validation if date-time after constraint value', () => {
    const validation = {
        datatype: 'plainDateTime',
        value: '2021-01-01T12:01:01',
    };
    assertEquals(afterDateTime(constraint)(validation), validation);
});
Deno.test('[afterDateTime] returns error if date-time before constraint value', () => {
    const validation = {
        datatype: 'plainDateTime',
        value: '2021-01-01T11:59:59',
    };
    assertEquals(afterDateTime(constraint)(validation), {
        ...validation,
        errors: [
            {
                constraint,
                error: TypeOfConstraint.AFTER_DATE_TIME,
            },
        ],
        isInvalid: true,
    });
});
Deno.test('[afterDateTime] returns error if bad date', () => {
    const validation = {
        datatype: 'plainDateTime',
        value: '2001-09-31',
    };
    assertEquals(afterDateTime(constraint)(validation), {
        ...validation,
        errors: [
            {
                constraint,
                error: TypeOfConstraint.AFTER_DATE_TIME,
                errorMessage: 'RangeError: value out of range: 1 <= 31 <= 30',
            },
        ],
        isInvalid: true,
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb2QudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sbURBQW1ELENBQUE7QUFDNUUsT0FBTyxhQUFhLE1BQU0sVUFBVSxDQUFBO0FBS3BDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDRCQUE0QixDQUFBO0FBQzdELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrREFBa0QsQ0FBQTtBQUUvRSxNQUFNLFVBQVUsR0FBNEI7SUFDM0MsY0FBYyxFQUFFLGdCQUFnQixDQUFDLGVBQWU7SUFDaEQsT0FBTyxFQUFFO1FBQ1IsUUFBUSxFQUFFLGVBQWU7UUFDekIsS0FBSyxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO1lBQ2xDLElBQUksRUFBRSxJQUFJO1lBQ1YsS0FBSyxFQUFFLENBQUM7WUFDUixHQUFHLEVBQUUsQ0FBQztZQUNOLElBQUksRUFBRSxFQUFFO1NBQ1IsQ0FBQztLQUNGO0NBQ0QsQ0FBQTtBQUVELElBQUksQ0FBQyxJQUFJLENBQ1IsZ0ZBQWdGLEVBQ2hGLEdBQUcsRUFBRTtJQUNKLE1BQU0sVUFBVSxHQUFlO1FBQzlCLFFBQVEsRUFBRSxlQUFlO1FBQ3pCLEtBQUssRUFBRSxxQkFBcUI7S0FDNUIsQ0FBQTtJQUVELFlBQVksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUE7QUFDaEUsQ0FBQyxDQUNELENBQUE7QUFFRCxJQUFJLENBQUMsSUFBSSxDQUNSLG9FQUFvRSxFQUNwRSxHQUFHLEVBQUU7SUFDSixNQUFNLFVBQVUsR0FBZTtRQUM5QixRQUFRLEVBQUUsZUFBZTtRQUN6QixLQUFLLEVBQUUscUJBQXFCO0tBQzVCLENBQUE7SUFFRCxZQUFZLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQ25ELEdBQUcsVUFBVTtRQUNiLE1BQU0sRUFBRTtZQUNQO2dCQUNDLFVBQVU7Z0JBQ1YsS0FBSyxFQUFFLGdCQUFnQixDQUFDLGVBQWU7YUFDdkM7U0FDRDtRQUNELFNBQVMsRUFBRSxJQUFJO0tBQ2YsQ0FBQyxDQUFBO0FBQ0gsQ0FBQyxDQUNELENBQUE7QUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLDJDQUEyQyxFQUFFLEdBQUcsRUFBRTtJQUMzRCxNQUFNLFVBQVUsR0FBZTtRQUM5QixRQUFRLEVBQUUsZUFBZTtRQUN6QixLQUFLLEVBQUUsWUFBWTtLQUNuQixDQUFBO0lBRUQsWUFBWSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUNuRCxHQUFHLFVBQVU7UUFDYixNQUFNLEVBQUU7WUFDUDtnQkFDQyxVQUFVO2dCQUNWLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxlQUFlO2dCQUN2QyxZQUFZLEVBQUUsK0NBQStDO2FBQzdEO1NBQ0Q7UUFDRCxTQUFTLEVBQUUsSUFBSTtLQUNmLENBQUMsQ0FBQTtBQUNILENBQUMsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGVtcG9yYWwgfSBmcm9tICdodHRwczovL2Nkbi5za3lwYWNrLmRldi9AanMtdGVtcG9yYWwvcG9seWZpbGw/ZHRzJ1xuaW1wb3J0IGFmdGVyRGF0ZVRpbWUgZnJvbSAnLi9tb2QudHMnXG5pbXBvcnQge1xuXHRBZnRlckRhdGVUaW1lQ29uc3RyYWludCxcblx0VmFsaWRhdGlvbixcbn0gZnJvbSAnLi4vLi4vLi4vLi4vdHlwZXMvY29uc3RyYWludHMudHMnXG5pbXBvcnQgeyBUeXBlT2ZDb25zdHJhaW50IH0gZnJvbSAnLi4vLi4vLi4vLi4vdHlwZXMvZW51bXMudHMnXG5pbXBvcnQgeyBhc3NlcnRFcXVhbHMgfSBmcm9tICdodHRwczovL2Rlbm8ubGFuZC9zdGRAMC4xMTguMC90ZXN0aW5nL2Fzc2VydHMudHMnXG5cbmNvbnN0IGNvbnN0cmFpbnQ6IEFmdGVyRGF0ZVRpbWVDb25zdHJhaW50ID0ge1xuXHRjb25zdHJhaW50VHlwZTogVHlwZU9mQ29uc3RyYWludC5BRlRFUl9EQVRFX1RJTUUsXG5cdG9wZXJhbmQ6IHtcblx0XHRkYXRhdHlwZTogJ3BsYWluRGF0ZVRpbWUnLFxuXHRcdHZhbHVlOiBUZW1wb3JhbC5QbGFpbkRhdGVUaW1lLmZyb20oe1xuXHRcdFx0eWVhcjogMjAyMSxcblx0XHRcdG1vbnRoOiAxLFxuXHRcdFx0ZGF5OiAxLFxuXHRcdFx0aG91cjogMTIsXG5cdFx0fSksXG5cdH0sXG59XG5cbkRlbm8udGVzdChcblx0J1thZnRlckRhdGVUaW1lXSByZXR1cm5zIGNvcnJlY3QgdmFsaWRhdGlvbiBpZiBkYXRlLXRpbWUgYWZ0ZXIgY29uc3RyYWludCB2YWx1ZScsXG5cdCgpID0+IHtcblx0XHRjb25zdCB2YWxpZGF0aW9uOiBWYWxpZGF0aW9uID0ge1xuXHRcdFx0ZGF0YXR5cGU6ICdwbGFpbkRhdGVUaW1lJyxcblx0XHRcdHZhbHVlOiAnMjAyMS0wMS0wMVQxMjowMTowMScsXG5cdFx0fVxuXG5cdFx0YXNzZXJ0RXF1YWxzKGFmdGVyRGF0ZVRpbWUoY29uc3RyYWludCkodmFsaWRhdGlvbiksIHZhbGlkYXRpb24pXG5cdH0sXG4pXG5cbkRlbm8udGVzdChcblx0J1thZnRlckRhdGVUaW1lXSByZXR1cm5zIGVycm9yIGlmIGRhdGUtdGltZSBiZWZvcmUgY29uc3RyYWludCB2YWx1ZScsXG5cdCgpID0+IHtcblx0XHRjb25zdCB2YWxpZGF0aW9uOiBWYWxpZGF0aW9uID0ge1xuXHRcdFx0ZGF0YXR5cGU6ICdwbGFpbkRhdGVUaW1lJyxcblx0XHRcdHZhbHVlOiAnMjAyMS0wMS0wMVQxMTo1OTo1OScsXG5cdFx0fVxuXG5cdFx0YXNzZXJ0RXF1YWxzKGFmdGVyRGF0ZVRpbWUoY29uc3RyYWludCkodmFsaWRhdGlvbiksIHtcblx0XHRcdC4uLnZhbGlkYXRpb24sXG5cdFx0XHRlcnJvcnM6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNvbnN0cmFpbnQsXG5cdFx0XHRcdFx0ZXJyb3I6IFR5cGVPZkNvbnN0cmFpbnQuQUZURVJfREFURV9USU1FLFxuXHRcdFx0XHR9LFxuXHRcdFx0XSxcblx0XHRcdGlzSW52YWxpZDogdHJ1ZSxcblx0XHR9KVxuXHR9LFxuKVxuXG5EZW5vLnRlc3QoJ1thZnRlckRhdGVUaW1lXSByZXR1cm5zIGVycm9yIGlmIGJhZCBkYXRlJywgKCkgPT4ge1xuXHRjb25zdCB2YWxpZGF0aW9uOiBWYWxpZGF0aW9uID0ge1xuXHRcdGRhdGF0eXBlOiAncGxhaW5EYXRlVGltZScsXG5cdFx0dmFsdWU6ICcyMDAxLTA5LTMxJyxcblx0fVxuXG5cdGFzc2VydEVxdWFscyhhZnRlckRhdGVUaW1lKGNvbnN0cmFpbnQpKHZhbGlkYXRpb24pLCB7XG5cdFx0Li4udmFsaWRhdGlvbixcblx0XHRlcnJvcnM6IFtcblx0XHRcdHtcblx0XHRcdFx0Y29uc3RyYWludCxcblx0XHRcdFx0ZXJyb3I6IFR5cGVPZkNvbnN0cmFpbnQuQUZURVJfREFURV9USU1FLFxuXHRcdFx0XHRlcnJvck1lc3NhZ2U6ICdSYW5nZUVycm9yOiB2YWx1ZSBvdXQgb2YgcmFuZ2U6IDEgPD0gMzEgPD0gMzAnLFxuXHRcdFx0fSxcblx0XHRdLFxuXHRcdGlzSW52YWxpZDogdHJ1ZSxcblx0fSlcbn0pXG4iXX0=