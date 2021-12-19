import makeIsReal from './mod.ts';
import { TypeOfConstraint } from '../../../../types/enums.ts';
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts';
const constraint = {
    constraintType: TypeOfConstraint.IS_REAL,
};
Deno.test('[makeIsReal] returns correct validation when value is a real number', () => {
    const validation = {
        datatype: 'real',
        value: 3.1415,
    };
    assertEquals(makeIsReal(constraint)(validation), validation);
});
Deno.test('[makeIsReal] returns error when value is not a real number', () => {
    const validation = {
        datatype: 'real',
        value: '7.7',
    };
    assertEquals(makeIsReal(constraint)(validation), {
        ...validation,
        isInvalid: true,
        errors: [
            {
                error: TypeOfConstraint.IS_REAL,
                constraint,
            },
        ],
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb2QudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFVBQVUsTUFBTSxVQUFVLENBQUE7QUFLakMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNEJBQTRCLENBQUE7QUFFN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtEQUFrRCxDQUFBO0FBRS9FLE1BQU0sVUFBVSxHQUF1QjtJQUN0QyxjQUFjLEVBQUUsZ0JBQWdCLENBQUMsT0FBTztDQUN4QyxDQUFBO0FBRUQsSUFBSSxDQUFDLElBQUksQ0FDUixxRUFBcUUsRUFDckUsR0FBRyxFQUFFO0lBQ0osTUFBTSxVQUFVLEdBQWU7UUFDOUIsUUFBUSxFQUFFLE1BQU07UUFDaEIsS0FBSyxFQUFFLE1BQU07S0FDYixDQUFBO0lBRUQsWUFBWSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQTtBQUM3RCxDQUFDLENBQ0QsQ0FBQTtBQUVELElBQUksQ0FBQyxJQUFJLENBQUMsNERBQTRELEVBQUUsR0FBRyxFQUFFO0lBQzVFLE1BQU0sVUFBVSxHQUFpQztRQUNoRCxRQUFRLEVBQUUsTUFBTTtRQUVoQixLQUFLLEVBQUUsS0FBSztLQUNaLENBQUE7SUFFRCxZQUFZLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQ2hELEdBQUcsVUFBVTtRQUNiLFNBQVMsRUFBRSxJQUFJO1FBQ2YsTUFBTSxFQUFFO1lBQ1A7Z0JBQ0MsS0FBSyxFQUFFLGdCQUFnQixDQUFDLE9BQU87Z0JBQy9CLFVBQVU7YUFDVjtTQUNEO0tBQ0QsQ0FBQyxDQUFBO0FBQ0gsQ0FBQyxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbWFrZUlzUmVhbCBmcm9tICcuL21vZC50cydcbmltcG9ydCB0eXBlIHtcblx0UmVhbFR5cGVDb25zdHJhaW50LFxuXHRWYWxpZGF0aW9uLFxufSBmcm9tICcuLi8uLi8uLi8uLi90eXBlcy9jb25zdHJhaW50cy50cydcbmltcG9ydCB7IFR5cGVPZkNvbnN0cmFpbnQgfSBmcm9tICcuLi8uLi8uLi8uLi90eXBlcy9lbnVtcy50cydcbmltcG9ydCB0eXBlIHsgUmVhbE51bWJlclZhbHVlIH0gZnJvbSAnLi4vLi4vLi4vLi4vdHlwZXMvdmFsdWVzLnRzJ1xuaW1wb3J0IHsgYXNzZXJ0RXF1YWxzIH0gZnJvbSAnaHR0cHM6Ly9kZW5vLmxhbmQvc3RkQDAuMTE4LjAvdGVzdGluZy9hc3NlcnRzLnRzJ1xuXG5jb25zdCBjb25zdHJhaW50OiBSZWFsVHlwZUNvbnN0cmFpbnQgPSB7XG5cdGNvbnN0cmFpbnRUeXBlOiBUeXBlT2ZDb25zdHJhaW50LklTX1JFQUwsXG59XG5cbkRlbm8udGVzdChcblx0J1ttYWtlSXNSZWFsXSByZXR1cm5zIGNvcnJlY3QgdmFsaWRhdGlvbiB3aGVuIHZhbHVlIGlzIGEgcmVhbCBudW1iZXInLFxuXHQoKSA9PiB7XG5cdFx0Y29uc3QgdmFsaWRhdGlvbjogVmFsaWRhdGlvbiA9IHtcblx0XHRcdGRhdGF0eXBlOiAncmVhbCcsXG5cdFx0XHR2YWx1ZTogMy4xNDE1LFxuXHRcdH1cblxuXHRcdGFzc2VydEVxdWFscyhtYWtlSXNSZWFsKGNvbnN0cmFpbnQpKHZhbGlkYXRpb24pLCB2YWxpZGF0aW9uKVxuXHR9LFxuKVxuXG5EZW5vLnRlc3QoJ1ttYWtlSXNSZWFsXSByZXR1cm5zIGVycm9yIHdoZW4gdmFsdWUgaXMgbm90IGEgcmVhbCBudW1iZXInLCAoKSA9PiB7XG5cdGNvbnN0IHZhbGlkYXRpb246IFZhbGlkYXRpb24gJiBSZWFsTnVtYmVyVmFsdWUgPSB7XG5cdFx0ZGF0YXR5cGU6ICdyZWFsJyxcblx0XHQvLyBAdHMtaWdub3JlOiBmb3IgdGVzdGluZyBwdXJwb3Nlc1xuXHRcdHZhbHVlOiAnNy43Jyxcblx0fVxuXG5cdGFzc2VydEVxdWFscyhtYWtlSXNSZWFsKGNvbnN0cmFpbnQpKHZhbGlkYXRpb24pLCB7XG5cdFx0Li4udmFsaWRhdGlvbixcblx0XHRpc0ludmFsaWQ6IHRydWUsXG5cdFx0ZXJyb3JzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdGVycm9yOiBUeXBlT2ZDb25zdHJhaW50LklTX1JFQUwsXG5cdFx0XHRcdGNvbnN0cmFpbnQsXG5cdFx0XHR9LFxuXHRcdF0sXG5cdH0pXG59KVxuIl19