import notBeforeAlphabetically from './mod.ts';
import { TypeOfConstraint } from '../../../../types/enums.ts';
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts';
const constraint = {
    constraintType: TypeOfConstraint.NOT_BEFORE_ALPHABETICALLY,
    operand: 'bob',
};
Deno.test('[notBeforeAlphabetically] returns correct validation if string comes before constraint value alphabetically', () => {
    const validation = {
        datatype: 'string',
        value: 'carol',
    };
    assertEquals(notBeforeAlphabetically(constraint)(validation), validation);
});
Deno.test('[notBeforeAlphabetically] returns correct validation if string and constraint value are alphabetically equal', () => {
    const validation = {
        datatype: 'string',
        value: 'BOB',
    };
    assertEquals(notBeforeAlphabetically({
        ...constraint,
        options: {
            sensitivity: 'base',
        },
    })(validation), validation);
});
Deno.test('[notBeforeAlphabetically] handles constraint with options', () => {
    const validation = {
        datatype: 'string',
        value: 'carol',
    };
    assertEquals(notBeforeAlphabetically({
        ...constraint,
        language: 'fr',
        options: {
            sensitivity: 'accent',
        },
    })(validation), validation);
});
Deno.test('[notBeforeAlphabetically] returns error if validation fails', () => {
    const validation = {
        datatype: 'string',
        value: 'alice',
    };
    assertEquals(notBeforeAlphabetically(constraint)(validation), {
        ...validation,
        errors: [
            {
                constraint,
                error: TypeOfConstraint.NOT_BEFORE_ALPHABETICALLY,
            },
        ],
        isInvalid: true,
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb2QudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLHVCQUF1QixNQUFNLFVBQVUsQ0FBQTtBQUs5QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQTtBQUM3RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0RBQWtELENBQUE7QUFFL0UsTUFBTSxVQUFVLEdBQXNDO0lBQ3JELGNBQWMsRUFBRSxnQkFBZ0IsQ0FBQyx5QkFBeUI7SUFDMUQsT0FBTyxFQUFFLEtBQUs7Q0FDZCxDQUFBO0FBRUQsSUFBSSxDQUFDLElBQUksQ0FDUiw2R0FBNkcsRUFDN0csR0FBRyxFQUFFO0lBQ0osTUFBTSxVQUFVLEdBQWU7UUFDOUIsUUFBUSxFQUFFLFFBQVE7UUFDbEIsS0FBSyxFQUFFLE9BQU87S0FDZCxDQUFBO0lBRUQsWUFBWSxDQUFDLHVCQUF1QixDQUFDLFVBQVUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFBO0FBQzFFLENBQUMsQ0FDRCxDQUFBO0FBRUQsSUFBSSxDQUFDLElBQUksQ0FDUiw4R0FBOEcsRUFDOUcsR0FBRyxFQUFFO0lBQ0osTUFBTSxVQUFVLEdBQWU7UUFDOUIsUUFBUSxFQUFFLFFBQVE7UUFDbEIsS0FBSyxFQUFFLEtBQUs7S0FDWixDQUFBO0lBRUQsWUFBWSxDQUNYLHVCQUF1QixDQUFDO1FBQ3ZCLEdBQUcsVUFBVTtRQUNiLE9BQU8sRUFBRTtZQUNSLFdBQVcsRUFBRSxNQUFNO1NBQ25CO0tBQ0QsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUNkLFVBQVUsQ0FDVixDQUFBO0FBQ0YsQ0FBQyxDQUNELENBQUE7QUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLDJEQUEyRCxFQUFFLEdBQUcsRUFBRTtJQUMzRSxNQUFNLFVBQVUsR0FBZTtRQUM5QixRQUFRLEVBQUUsUUFBUTtRQUNsQixLQUFLLEVBQUUsT0FBTztLQUNkLENBQUE7SUFFRCxZQUFZLENBQ1gsdUJBQXVCLENBQUM7UUFDdkIsR0FBRyxVQUFVO1FBQ2IsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUU7WUFDUixXQUFXLEVBQUUsUUFBUTtTQUNyQjtLQUNELENBQUMsQ0FBQyxVQUFVLENBQUMsRUFDZCxVQUFVLENBQ1YsQ0FBQTtBQUNGLENBQUMsQ0FBQyxDQUFBO0FBRUYsSUFBSSxDQUFDLElBQUksQ0FBQyw2REFBNkQsRUFBRSxHQUFHLEVBQUU7SUFDN0UsTUFBTSxVQUFVLEdBQWU7UUFDOUIsUUFBUSxFQUFFLFFBQVE7UUFDbEIsS0FBSyxFQUFFLE9BQU87S0FDZCxDQUFBO0lBRUQsWUFBWSxDQUFDLHVCQUF1QixDQUFDLFVBQVUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQzdELEdBQUcsVUFBVTtRQUNiLE1BQU0sRUFBRTtZQUNQO2dCQUNDLFVBQVU7Z0JBQ1YsS0FBSyxFQUFFLGdCQUFnQixDQUFDLHlCQUF5QjthQUNqRDtTQUNEO1FBQ0QsU0FBUyxFQUFFLElBQUk7S0FDZixDQUFDLENBQUE7QUFDSCxDQUFDLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBub3RCZWZvcmVBbHBoYWJldGljYWxseSBmcm9tICcuL21vZC50cydcbmltcG9ydCB7XG5cdE5vdEJlZm9yZUFscGhhYmV0aWNhbGx5Q29uc3RyYWludCxcblx0VmFsaWRhdGlvbixcbn0gZnJvbSAnLi4vLi4vLi4vLi4vdHlwZXMvY29uc3RyYWludHMudHMnXG5pbXBvcnQgeyBUeXBlT2ZDb25zdHJhaW50IH0gZnJvbSAnLi4vLi4vLi4vLi4vdHlwZXMvZW51bXMudHMnXG5pbXBvcnQgeyBhc3NlcnRFcXVhbHMgfSBmcm9tICdodHRwczovL2Rlbm8ubGFuZC9zdGRAMC4xMTguMC90ZXN0aW5nL2Fzc2VydHMudHMnXG5cbmNvbnN0IGNvbnN0cmFpbnQ6IE5vdEJlZm9yZUFscGhhYmV0aWNhbGx5Q29uc3RyYWludCA9IHtcblx0Y29uc3RyYWludFR5cGU6IFR5cGVPZkNvbnN0cmFpbnQuTk9UX0JFRk9SRV9BTFBIQUJFVElDQUxMWSxcblx0b3BlcmFuZDogJ2JvYicsXG59XG5cbkRlbm8udGVzdChcblx0J1tub3RCZWZvcmVBbHBoYWJldGljYWxseV0gcmV0dXJucyBjb3JyZWN0IHZhbGlkYXRpb24gaWYgc3RyaW5nIGNvbWVzIGJlZm9yZSBjb25zdHJhaW50IHZhbHVlIGFscGhhYmV0aWNhbGx5Jyxcblx0KCkgPT4ge1xuXHRcdGNvbnN0IHZhbGlkYXRpb246IFZhbGlkYXRpb24gPSB7XG5cdFx0XHRkYXRhdHlwZTogJ3N0cmluZycsXG5cdFx0XHR2YWx1ZTogJ2Nhcm9sJyxcblx0XHR9XG5cblx0XHRhc3NlcnRFcXVhbHMobm90QmVmb3JlQWxwaGFiZXRpY2FsbHkoY29uc3RyYWludCkodmFsaWRhdGlvbiksIHZhbGlkYXRpb24pXG5cdH0sXG4pXG5cbkRlbm8udGVzdChcblx0J1tub3RCZWZvcmVBbHBoYWJldGljYWxseV0gcmV0dXJucyBjb3JyZWN0IHZhbGlkYXRpb24gaWYgc3RyaW5nIGFuZCBjb25zdHJhaW50IHZhbHVlIGFyZSBhbHBoYWJldGljYWxseSBlcXVhbCcsXG5cdCgpID0+IHtcblx0XHRjb25zdCB2YWxpZGF0aW9uOiBWYWxpZGF0aW9uID0ge1xuXHRcdFx0ZGF0YXR5cGU6ICdzdHJpbmcnLFxuXHRcdFx0dmFsdWU6ICdCT0InLFxuXHRcdH1cblxuXHRcdGFzc2VydEVxdWFscyhcblx0XHRcdG5vdEJlZm9yZUFscGhhYmV0aWNhbGx5KHtcblx0XHRcdFx0Li4uY29uc3RyYWludCxcblx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdHNlbnNpdGl2aXR5OiAnYmFzZScsXG5cdFx0XHRcdH0sXG5cdFx0XHR9KSh2YWxpZGF0aW9uKSxcblx0XHRcdHZhbGlkYXRpb24sXG5cdFx0KVxuXHR9LFxuKVxuXG5EZW5vLnRlc3QoJ1tub3RCZWZvcmVBbHBoYWJldGljYWxseV0gaGFuZGxlcyBjb25zdHJhaW50IHdpdGggb3B0aW9ucycsICgpID0+IHtcblx0Y29uc3QgdmFsaWRhdGlvbjogVmFsaWRhdGlvbiA9IHtcblx0XHRkYXRhdHlwZTogJ3N0cmluZycsXG5cdFx0dmFsdWU6ICdjYXJvbCcsXG5cdH1cblxuXHRhc3NlcnRFcXVhbHMoXG5cdFx0bm90QmVmb3JlQWxwaGFiZXRpY2FsbHkoe1xuXHRcdFx0Li4uY29uc3RyYWludCxcblx0XHRcdGxhbmd1YWdlOiAnZnInLFxuXHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRzZW5zaXRpdml0eTogJ2FjY2VudCcsXG5cdFx0XHR9LFxuXHRcdH0pKHZhbGlkYXRpb24pLFxuXHRcdHZhbGlkYXRpb24sXG5cdClcbn0pXG5cbkRlbm8udGVzdCgnW25vdEJlZm9yZUFscGhhYmV0aWNhbGx5XSByZXR1cm5zIGVycm9yIGlmIHZhbGlkYXRpb24gZmFpbHMnLCAoKSA9PiB7XG5cdGNvbnN0IHZhbGlkYXRpb246IFZhbGlkYXRpb24gPSB7XG5cdFx0ZGF0YXR5cGU6ICdzdHJpbmcnLFxuXHRcdHZhbHVlOiAnYWxpY2UnLFxuXHR9XG5cblx0YXNzZXJ0RXF1YWxzKG5vdEJlZm9yZUFscGhhYmV0aWNhbGx5KGNvbnN0cmFpbnQpKHZhbGlkYXRpb24pLCB7XG5cdFx0Li4udmFsaWRhdGlvbixcblx0XHRlcnJvcnM6IFtcblx0XHRcdHtcblx0XHRcdFx0Y29uc3RyYWludCxcblx0XHRcdFx0ZXJyb3I6IFR5cGVPZkNvbnN0cmFpbnQuTk9UX0JFRk9SRV9BTFBIQUJFVElDQUxMWSxcblx0XHRcdH0sXG5cdFx0XSxcblx0XHRpc0ludmFsaWQ6IHRydWUsXG5cdH0pXG59KVxuIl19