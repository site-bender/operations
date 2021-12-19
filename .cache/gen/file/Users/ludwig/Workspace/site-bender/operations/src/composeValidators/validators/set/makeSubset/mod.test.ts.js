import subset from './mod.ts';
import { TypeOfConstraint } from '../../../../types/enums.ts';
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts';
const constraint = {
    constraintType: TypeOfConstraint.SUBSET,
    operand: 'red,yellow,green,cyan,blue,magenta',
};
Deno.test('[subset] returns correct validation if value set is a subset of the constraint set', () => {
    const validation = {
        datatype: 'set',
        value: 'cyan,red,yellow,blue',
    };
    assertEquals(subset(constraint)(validation), validation);
});
Deno.test('[subset] returns correct validation with arrays', () => {
    const validation = {
        datatype: 'set',
        value: ['red', 'yellow', 'blue'],
    };
    assertEquals(subset({
        ...constraint,
        operand: ['cyan', 'red', 'yellow', 'blue'],
    })(validation), validation);
});
Deno.test('[subset] returns correct validation with sets', () => {
    const validation = {
        datatype: 'set',
        value: new Set(['cyan', 'magenta', 'blue']),
    };
    assertEquals(subset({
        ...constraint,
        operand: new Set(['cyan', 'magenta', 'yellow', 'blue']),
    })(validation), validation);
});
Deno.test('[subset] returns correct validation if value set has no members (is empty)', () => {
    const validation = {
        datatype: 'set',
        value: [],
    };
    assertEquals(subset(constraint)(validation), validation);
});
Deno.test('[subset] returns error if value set has members not in constraint set', () => {
    const validation = {
        datatype: 'set',
        value: 'cyan,magenta,yellow,black',
    };
    assertEquals(subset(constraint)(validation), {
        ...validation,
        errors: [
            {
                constraint,
                error: TypeOfConstraint.SUBSET,
            },
        ],
        isInvalid: true,
    });
});
Deno.test('[subset] returns error if value set is identical to constraint set', () => {
    const validation = {
        datatype: 'set',
        value: 'cyan,blue,magenta,red,yellow,green',
    };
    assertEquals(subset(constraint)(validation), {
        ...validation,
        errors: [
            {
                constraint,
                error: TypeOfConstraint.SUBSET,
            },
        ],
        isInvalid: true,
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb2QudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLE1BQU0sTUFBTSxVQUFVLENBQUE7QUFLN0IsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNEJBQTRCLENBQUE7QUFDN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtEQUFrRCxDQUFBO0FBRS9FLE1BQU0sVUFBVSxHQUFxQjtJQUNwQyxjQUFjLEVBQUUsZ0JBQWdCLENBQUMsTUFBTTtJQUN2QyxPQUFPLEVBQUUsb0NBQW9DO0NBQzdDLENBQUE7QUFFRCxJQUFJLENBQUMsSUFBSSxDQUNSLG9GQUFvRixFQUNwRixHQUFHLEVBQUU7SUFDSixNQUFNLFVBQVUsR0FBZTtRQUM5QixRQUFRLEVBQUUsS0FBSztRQUNmLEtBQUssRUFBRSxzQkFBc0I7S0FDN0IsQ0FBQTtJQUVELFlBQVksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUE7QUFDekQsQ0FBQyxDQUNELENBQUE7QUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLGlEQUFpRCxFQUFFLEdBQUcsRUFBRTtJQUNqRSxNQUFNLFVBQVUsR0FBZTtRQUM5QixRQUFRLEVBQUUsS0FBSztRQUNmLEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDO0tBQ2hDLENBQUE7SUFFRCxZQUFZLENBQ1gsTUFBTSxDQUFDO1FBQ04sR0FBRyxVQUFVO1FBQ2IsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDO0tBQzFDLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFDZCxVQUFVLENBQ1YsQ0FBQTtBQUNGLENBQUMsQ0FBQyxDQUFBO0FBRUYsSUFBSSxDQUFDLElBQUksQ0FBQywrQ0FBK0MsRUFBRSxHQUFHLEVBQUU7SUFDL0QsTUFBTSxVQUFVLEdBQWU7UUFDOUIsUUFBUSxFQUFFLEtBQUs7UUFDZixLQUFLLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0tBQzNDLENBQUE7SUFFRCxZQUFZLENBQ1gsTUFBTSxDQUFDO1FBQ04sR0FBRyxVQUFVO1FBQ2IsT0FBTyxFQUFFLElBQUksR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FDdkQsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUNkLFVBQVUsQ0FDVixDQUFBO0FBQ0YsQ0FBQyxDQUFDLENBQUE7QUFFRixJQUFJLENBQUMsSUFBSSxDQUNSLDRFQUE0RSxFQUM1RSxHQUFHLEVBQUU7SUFDSixNQUFNLFVBQVUsR0FBZTtRQUM5QixRQUFRLEVBQUUsS0FBSztRQUNmLEtBQUssRUFBRSxFQUFFO0tBQ1QsQ0FBQTtJQUVELFlBQVksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUE7QUFDekQsQ0FBQyxDQUNELENBQUE7QUFFRCxJQUFJLENBQUMsSUFBSSxDQUNSLHVFQUF1RSxFQUN2RSxHQUFHLEVBQUU7SUFDSixNQUFNLFVBQVUsR0FBZTtRQUM5QixRQUFRLEVBQUUsS0FBSztRQUNmLEtBQUssRUFBRSwyQkFBMkI7S0FDbEMsQ0FBQTtJQUVELFlBQVksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDNUMsR0FBRyxVQUFVO1FBQ2IsTUFBTSxFQUFFO1lBQ1A7Z0JBQ0MsVUFBVTtnQkFDVixLQUFLLEVBQUUsZ0JBQWdCLENBQUMsTUFBTTthQUM5QjtTQUNEO1FBQ0QsU0FBUyxFQUFFLElBQUk7S0FDZixDQUFDLENBQUE7QUFDSCxDQUFDLENBQ0QsQ0FBQTtBQUVELElBQUksQ0FBQyxJQUFJLENBQ1Isb0VBQW9FLEVBQ3BFLEdBQUcsRUFBRTtJQUNKLE1BQU0sVUFBVSxHQUFlO1FBQzlCLFFBQVEsRUFBRSxLQUFLO1FBQ2YsS0FBSyxFQUFFLG9DQUFvQztLQUMzQyxDQUFBO0lBRUQsWUFBWSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUM1QyxHQUFHLFVBQVU7UUFDYixNQUFNLEVBQUU7WUFDUDtnQkFDQyxVQUFVO2dCQUNWLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxNQUFNO2FBQzlCO1NBQ0Q7UUFDRCxTQUFTLEVBQUUsSUFBSTtLQUNmLENBQUMsQ0FBQTtBQUNILENBQUMsQ0FDRCxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHN1YnNldCBmcm9tICcuL21vZC50cydcbmltcG9ydCB0eXBlIHtcblx0U3Vic2V0Q29uc3RyYWludCxcblx0VmFsaWRhdGlvbixcbn0gZnJvbSAnLi4vLi4vLi4vLi4vdHlwZXMvY29uc3RyYWludHMudHMnXG5pbXBvcnQgeyBUeXBlT2ZDb25zdHJhaW50IH0gZnJvbSAnLi4vLi4vLi4vLi4vdHlwZXMvZW51bXMudHMnXG5pbXBvcnQgeyBhc3NlcnRFcXVhbHMgfSBmcm9tICdodHRwczovL2Rlbm8ubGFuZC9zdGRAMC4xMTguMC90ZXN0aW5nL2Fzc2VydHMudHMnXG5cbmNvbnN0IGNvbnN0cmFpbnQ6IFN1YnNldENvbnN0cmFpbnQgPSB7XG5cdGNvbnN0cmFpbnRUeXBlOiBUeXBlT2ZDb25zdHJhaW50LlNVQlNFVCxcblx0b3BlcmFuZDogJ3JlZCx5ZWxsb3csZ3JlZW4sY3lhbixibHVlLG1hZ2VudGEnLFxufVxuXG5EZW5vLnRlc3QoXG5cdCdbc3Vic2V0XSByZXR1cm5zIGNvcnJlY3QgdmFsaWRhdGlvbiBpZiB2YWx1ZSBzZXQgaXMgYSBzdWJzZXQgb2YgdGhlIGNvbnN0cmFpbnQgc2V0Jyxcblx0KCkgPT4ge1xuXHRcdGNvbnN0IHZhbGlkYXRpb246IFZhbGlkYXRpb24gPSB7XG5cdFx0XHRkYXRhdHlwZTogJ3NldCcsXG5cdFx0XHR2YWx1ZTogJ2N5YW4scmVkLHllbGxvdyxibHVlJyxcblx0XHR9XG5cblx0XHRhc3NlcnRFcXVhbHMoc3Vic2V0KGNvbnN0cmFpbnQpKHZhbGlkYXRpb24pLCB2YWxpZGF0aW9uKVxuXHR9LFxuKVxuXG5EZW5vLnRlc3QoJ1tzdWJzZXRdIHJldHVybnMgY29ycmVjdCB2YWxpZGF0aW9uIHdpdGggYXJyYXlzJywgKCkgPT4ge1xuXHRjb25zdCB2YWxpZGF0aW9uOiBWYWxpZGF0aW9uID0ge1xuXHRcdGRhdGF0eXBlOiAnc2V0Jyxcblx0XHR2YWx1ZTogWydyZWQnLCAneWVsbG93JywgJ2JsdWUnXSxcblx0fVxuXG5cdGFzc2VydEVxdWFscyhcblx0XHRzdWJzZXQoe1xuXHRcdFx0Li4uY29uc3RyYWludCxcblx0XHRcdG9wZXJhbmQ6IFsnY3lhbicsICdyZWQnLCAneWVsbG93JywgJ2JsdWUnXSxcblx0XHR9KSh2YWxpZGF0aW9uKSxcblx0XHR2YWxpZGF0aW9uLFxuXHQpXG59KVxuXG5EZW5vLnRlc3QoJ1tzdWJzZXRdIHJldHVybnMgY29ycmVjdCB2YWxpZGF0aW9uIHdpdGggc2V0cycsICgpID0+IHtcblx0Y29uc3QgdmFsaWRhdGlvbjogVmFsaWRhdGlvbiA9IHtcblx0XHRkYXRhdHlwZTogJ3NldCcsXG5cdFx0dmFsdWU6IG5ldyBTZXQoWydjeWFuJywgJ21hZ2VudGEnLCAnYmx1ZSddKSxcblx0fVxuXG5cdGFzc2VydEVxdWFscyhcblx0XHRzdWJzZXQoe1xuXHRcdFx0Li4uY29uc3RyYWludCxcblx0XHRcdG9wZXJhbmQ6IG5ldyBTZXQoWydjeWFuJywgJ21hZ2VudGEnLCAneWVsbG93JywgJ2JsdWUnXSksXG5cdFx0fSkodmFsaWRhdGlvbiksXG5cdFx0dmFsaWRhdGlvbixcblx0KVxufSlcblxuRGVuby50ZXN0KFxuXHQnW3N1YnNldF0gcmV0dXJucyBjb3JyZWN0IHZhbGlkYXRpb24gaWYgdmFsdWUgc2V0IGhhcyBubyBtZW1iZXJzIChpcyBlbXB0eSknLFxuXHQoKSA9PiB7XG5cdFx0Y29uc3QgdmFsaWRhdGlvbjogVmFsaWRhdGlvbiA9IHtcblx0XHRcdGRhdGF0eXBlOiAnc2V0Jyxcblx0XHRcdHZhbHVlOiBbXSxcblx0XHR9XG5cblx0XHRhc3NlcnRFcXVhbHMoc3Vic2V0KGNvbnN0cmFpbnQpKHZhbGlkYXRpb24pLCB2YWxpZGF0aW9uKVxuXHR9LFxuKVxuXG5EZW5vLnRlc3QoXG5cdCdbc3Vic2V0XSByZXR1cm5zIGVycm9yIGlmIHZhbHVlIHNldCBoYXMgbWVtYmVycyBub3QgaW4gY29uc3RyYWludCBzZXQnLFxuXHQoKSA9PiB7XG5cdFx0Y29uc3QgdmFsaWRhdGlvbjogVmFsaWRhdGlvbiA9IHtcblx0XHRcdGRhdGF0eXBlOiAnc2V0Jyxcblx0XHRcdHZhbHVlOiAnY3lhbixtYWdlbnRhLHllbGxvdyxibGFjaycsXG5cdFx0fVxuXG5cdFx0YXNzZXJ0RXF1YWxzKHN1YnNldChjb25zdHJhaW50KSh2YWxpZGF0aW9uKSwge1xuXHRcdFx0Li4udmFsaWRhdGlvbixcblx0XHRcdGVycm9yczogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y29uc3RyYWludCxcblx0XHRcdFx0XHRlcnJvcjogVHlwZU9mQ29uc3RyYWludC5TVUJTRVQsXG5cdFx0XHRcdH0sXG5cdFx0XHRdLFxuXHRcdFx0aXNJbnZhbGlkOiB0cnVlLFxuXHRcdH0pXG5cdH0sXG4pXG5cbkRlbm8udGVzdChcblx0J1tzdWJzZXRdIHJldHVybnMgZXJyb3IgaWYgdmFsdWUgc2V0IGlzIGlkZW50aWNhbCB0byBjb25zdHJhaW50IHNldCcsXG5cdCgpID0+IHtcblx0XHRjb25zdCB2YWxpZGF0aW9uOiBWYWxpZGF0aW9uID0ge1xuXHRcdFx0ZGF0YXR5cGU6ICdzZXQnLFxuXHRcdFx0dmFsdWU6ICdjeWFuLGJsdWUsbWFnZW50YSxyZWQseWVsbG93LGdyZWVuJyxcblx0XHR9XG5cblx0XHRhc3NlcnRFcXVhbHMoc3Vic2V0KGNvbnN0cmFpbnQpKHZhbGlkYXRpb24pLCB7XG5cdFx0XHQuLi52YWxpZGF0aW9uLFxuXHRcdFx0ZXJyb3JzOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb25zdHJhaW50LFxuXHRcdFx0XHRcdGVycm9yOiBUeXBlT2ZDb25zdHJhaW50LlNVQlNFVCxcblx0XHRcdFx0fSxcblx0XHRcdF0sXG5cdFx0XHRpc0ludmFsaWQ6IHRydWUsXG5cdFx0fSlcblx0fSxcbilcbiJdfQ==