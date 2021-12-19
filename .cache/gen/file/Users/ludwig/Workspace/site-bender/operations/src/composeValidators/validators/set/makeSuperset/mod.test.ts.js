import superset from './mod.ts';
import { TypeOfConstraint } from '../../../../types/enums.ts';
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts';
const constraint = {
    constraintType: TypeOfConstraint.SUPERSET,
    operand: 'cyan,red,yellow,blue',
};
Deno.test('[superset] returns correct validation if value set is a superset of the constraint set', () => {
    const validation = {
        datatype: 'set',
        value: 'red,yellow,green,cyan,blue,magenta',
    };
    assertEquals(superset(constraint)(validation), validation);
});
Deno.test('[superset] returns correct validation with arrays', () => {
    const validation = {
        datatype: 'set',
        value: ['cyan', 'red', 'yellow', 'blue'],
    };
    assertEquals(superset({
        ...constraint,
        operand: ['red', 'yellow', 'blue'],
    })(validation), validation);
});
Deno.test('[superset] returns correct validation with sets', () => {
    const validation = {
        datatype: 'set',
        value: new Set(['cyan', 'magenta', 'yellow', 'blue']),
    };
    assertEquals(superset({
        ...constraint,
        operand: new Set(['cyan', 'magenta', 'blue']),
    })(validation), validation);
});
Deno.test('[superset] returns correct validation if constraint set has no members (is empty)', () => {
    const validation = {
        datatype: 'set',
        value: 'cyan,red,yellow,blue',
    };
    assertEquals(superset({
        ...constraint,
        operand: [],
    })(validation), validation);
});
Deno.test('[superset] returns error if constraint set has members not in value set', () => {
    const validation = {
        datatype: 'set',
        value: 'cyan,red,yellow,black',
    };
    assertEquals(superset(constraint)(validation), {
        ...validation,
        errors: [
            {
                constraint,
                error: TypeOfConstraint.SUPERSET,
            },
        ],
        isInvalid: true,
    });
});
Deno.test('[superset] returns error if value set is identical to constraint set', () => {
    const validation = {
        datatype: 'set',
        value: 'cyan,red,yellow,blue',
    };
    assertEquals(superset(constraint)(validation), {
        ...validation,
        errors: [
            {
                constraint,
                error: TypeOfConstraint.SUPERSET,
            },
        ],
        isInvalid: true,
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb2QudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFFBQVEsTUFBTSxVQUFVLENBQUE7QUFLL0IsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNEJBQTRCLENBQUE7QUFDN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtEQUFrRCxDQUFBO0FBRS9FLE1BQU0sVUFBVSxHQUF1QjtJQUN0QyxjQUFjLEVBQUUsZ0JBQWdCLENBQUMsUUFBUTtJQUN6QyxPQUFPLEVBQUUsc0JBQXNCO0NBQy9CLENBQUE7QUFFRCxJQUFJLENBQUMsSUFBSSxDQUNSLHdGQUF3RixFQUN4RixHQUFHLEVBQUU7SUFDSixNQUFNLFVBQVUsR0FBZTtRQUM5QixRQUFRLEVBQUUsS0FBSztRQUNmLEtBQUssRUFBRSxvQ0FBb0M7S0FDM0MsQ0FBQTtJQUVELFlBQVksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUE7QUFDM0QsQ0FBQyxDQUNELENBQUE7QUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLG1EQUFtRCxFQUFFLEdBQUcsRUFBRTtJQUNuRSxNQUFNLFVBQVUsR0FBZTtRQUM5QixRQUFRLEVBQUUsS0FBSztRQUNmLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQztLQUN4QyxDQUFBO0lBRUQsWUFBWSxDQUNYLFFBQVEsQ0FBQztRQUNSLEdBQUcsVUFBVTtRQUNiLE9BQU8sRUFBRSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDO0tBQ2xDLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFDZCxVQUFVLENBQ1YsQ0FBQTtBQUNGLENBQUMsQ0FBQyxDQUFBO0FBRUYsSUFBSSxDQUFDLElBQUksQ0FBQyxpREFBaUQsRUFBRSxHQUFHLEVBQUU7SUFDakUsTUFBTSxVQUFVLEdBQWU7UUFDOUIsUUFBUSxFQUFFLEtBQUs7UUFDZixLQUFLLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztLQUNyRCxDQUFBO0lBRUQsWUFBWSxDQUNYLFFBQVEsQ0FBQztRQUNSLEdBQUcsVUFBVTtRQUNiLE9BQU8sRUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FDN0MsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUNkLFVBQVUsQ0FDVixDQUFBO0FBQ0YsQ0FBQyxDQUFDLENBQUE7QUFFRixJQUFJLENBQUMsSUFBSSxDQUNSLG1GQUFtRixFQUNuRixHQUFHLEVBQUU7SUFDSixNQUFNLFVBQVUsR0FBZTtRQUM5QixRQUFRLEVBQUUsS0FBSztRQUNmLEtBQUssRUFBRSxzQkFBc0I7S0FDN0IsQ0FBQTtJQUVELFlBQVksQ0FDWCxRQUFRLENBQUM7UUFDUixHQUFHLFVBQVU7UUFDYixPQUFPLEVBQUUsRUFBRTtLQUNYLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFDZCxVQUFVLENBQ1YsQ0FBQTtBQUNGLENBQUMsQ0FDRCxDQUFBO0FBRUQsSUFBSSxDQUFDLElBQUksQ0FDUix5RUFBeUUsRUFDekUsR0FBRyxFQUFFO0lBQ0osTUFBTSxVQUFVLEdBQWU7UUFDOUIsUUFBUSxFQUFFLEtBQUs7UUFDZixLQUFLLEVBQUUsdUJBQXVCO0tBQzlCLENBQUE7SUFFRCxZQUFZLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQzlDLEdBQUcsVUFBVTtRQUNiLE1BQU0sRUFBRTtZQUNQO2dCQUNDLFVBQVU7Z0JBQ1YsS0FBSyxFQUFFLGdCQUFnQixDQUFDLFFBQVE7YUFDaEM7U0FDRDtRQUNELFNBQVMsRUFBRSxJQUFJO0tBQ2YsQ0FBQyxDQUFBO0FBQ0gsQ0FBQyxDQUNELENBQUE7QUFFRCxJQUFJLENBQUMsSUFBSSxDQUNSLHNFQUFzRSxFQUN0RSxHQUFHLEVBQUU7SUFDSixNQUFNLFVBQVUsR0FBZTtRQUM5QixRQUFRLEVBQUUsS0FBSztRQUNmLEtBQUssRUFBRSxzQkFBc0I7S0FDN0IsQ0FBQTtJQUVELFlBQVksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDOUMsR0FBRyxVQUFVO1FBQ2IsTUFBTSxFQUFFO1lBQ1A7Z0JBQ0MsVUFBVTtnQkFDVixLQUFLLEVBQUUsZ0JBQWdCLENBQUMsUUFBUTthQUNoQztTQUNEO1FBQ0QsU0FBUyxFQUFFLElBQUk7S0FDZixDQUFDLENBQUE7QUFDSCxDQUFDLENBQ0QsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzdXBlcnNldCBmcm9tICcuL21vZC50cydcbmltcG9ydCB7XG5cdFN1cGVyc2V0Q29uc3RyYWludCxcblx0VmFsaWRhdGlvbixcbn0gZnJvbSAnLi4vLi4vLi4vLi4vdHlwZXMvY29uc3RyYWludHMudHMnXG5pbXBvcnQgeyBUeXBlT2ZDb25zdHJhaW50IH0gZnJvbSAnLi4vLi4vLi4vLi4vdHlwZXMvZW51bXMudHMnXG5pbXBvcnQgeyBhc3NlcnRFcXVhbHMgfSBmcm9tICdodHRwczovL2Rlbm8ubGFuZC9zdGRAMC4xMTguMC90ZXN0aW5nL2Fzc2VydHMudHMnXG5cbmNvbnN0IGNvbnN0cmFpbnQ6IFN1cGVyc2V0Q29uc3RyYWludCA9IHtcblx0Y29uc3RyYWludFR5cGU6IFR5cGVPZkNvbnN0cmFpbnQuU1VQRVJTRVQsXG5cdG9wZXJhbmQ6ICdjeWFuLHJlZCx5ZWxsb3csYmx1ZScsXG59XG5cbkRlbm8udGVzdChcblx0J1tzdXBlcnNldF0gcmV0dXJucyBjb3JyZWN0IHZhbGlkYXRpb24gaWYgdmFsdWUgc2V0IGlzIGEgc3VwZXJzZXQgb2YgdGhlIGNvbnN0cmFpbnQgc2V0Jyxcblx0KCkgPT4ge1xuXHRcdGNvbnN0IHZhbGlkYXRpb246IFZhbGlkYXRpb24gPSB7XG5cdFx0XHRkYXRhdHlwZTogJ3NldCcsXG5cdFx0XHR2YWx1ZTogJ3JlZCx5ZWxsb3csZ3JlZW4sY3lhbixibHVlLG1hZ2VudGEnLFxuXHRcdH1cblxuXHRcdGFzc2VydEVxdWFscyhzdXBlcnNldChjb25zdHJhaW50KSh2YWxpZGF0aW9uKSwgdmFsaWRhdGlvbilcblx0fSxcbilcblxuRGVuby50ZXN0KCdbc3VwZXJzZXRdIHJldHVybnMgY29ycmVjdCB2YWxpZGF0aW9uIHdpdGggYXJyYXlzJywgKCkgPT4ge1xuXHRjb25zdCB2YWxpZGF0aW9uOiBWYWxpZGF0aW9uID0ge1xuXHRcdGRhdGF0eXBlOiAnc2V0Jyxcblx0XHR2YWx1ZTogWydjeWFuJywgJ3JlZCcsICd5ZWxsb3cnLCAnYmx1ZSddLFxuXHR9XG5cblx0YXNzZXJ0RXF1YWxzKFxuXHRcdHN1cGVyc2V0KHtcblx0XHRcdC4uLmNvbnN0cmFpbnQsXG5cdFx0XHRvcGVyYW5kOiBbJ3JlZCcsICd5ZWxsb3cnLCAnYmx1ZSddLFxuXHRcdH0pKHZhbGlkYXRpb24pLFxuXHRcdHZhbGlkYXRpb24sXG5cdClcbn0pXG5cbkRlbm8udGVzdCgnW3N1cGVyc2V0XSByZXR1cm5zIGNvcnJlY3QgdmFsaWRhdGlvbiB3aXRoIHNldHMnLCAoKSA9PiB7XG5cdGNvbnN0IHZhbGlkYXRpb246IFZhbGlkYXRpb24gPSB7XG5cdFx0ZGF0YXR5cGU6ICdzZXQnLFxuXHRcdHZhbHVlOiBuZXcgU2V0KFsnY3lhbicsICdtYWdlbnRhJywgJ3llbGxvdycsICdibHVlJ10pLFxuXHR9XG5cblx0YXNzZXJ0RXF1YWxzKFxuXHRcdHN1cGVyc2V0KHtcblx0XHRcdC4uLmNvbnN0cmFpbnQsXG5cdFx0XHRvcGVyYW5kOiBuZXcgU2V0KFsnY3lhbicsICdtYWdlbnRhJywgJ2JsdWUnXSksXG5cdFx0fSkodmFsaWRhdGlvbiksXG5cdFx0dmFsaWRhdGlvbixcblx0KVxufSlcblxuRGVuby50ZXN0KFxuXHQnW3N1cGVyc2V0XSByZXR1cm5zIGNvcnJlY3QgdmFsaWRhdGlvbiBpZiBjb25zdHJhaW50IHNldCBoYXMgbm8gbWVtYmVycyAoaXMgZW1wdHkpJyxcblx0KCkgPT4ge1xuXHRcdGNvbnN0IHZhbGlkYXRpb246IFZhbGlkYXRpb24gPSB7XG5cdFx0XHRkYXRhdHlwZTogJ3NldCcsXG5cdFx0XHR2YWx1ZTogJ2N5YW4scmVkLHllbGxvdyxibHVlJyxcblx0XHR9XG5cblx0XHRhc3NlcnRFcXVhbHMoXG5cdFx0XHRzdXBlcnNldCh7XG5cdFx0XHRcdC4uLmNvbnN0cmFpbnQsXG5cdFx0XHRcdG9wZXJhbmQ6IFtdLFxuXHRcdFx0fSkodmFsaWRhdGlvbiksXG5cdFx0XHR2YWxpZGF0aW9uLFxuXHRcdClcblx0fSxcbilcblxuRGVuby50ZXN0KFxuXHQnW3N1cGVyc2V0XSByZXR1cm5zIGVycm9yIGlmIGNvbnN0cmFpbnQgc2V0IGhhcyBtZW1iZXJzIG5vdCBpbiB2YWx1ZSBzZXQnLFxuXHQoKSA9PiB7XG5cdFx0Y29uc3QgdmFsaWRhdGlvbjogVmFsaWRhdGlvbiA9IHtcblx0XHRcdGRhdGF0eXBlOiAnc2V0Jyxcblx0XHRcdHZhbHVlOiAnY3lhbixyZWQseWVsbG93LGJsYWNrJyxcblx0XHR9XG5cblx0XHRhc3NlcnRFcXVhbHMoc3VwZXJzZXQoY29uc3RyYWludCkodmFsaWRhdGlvbiksIHtcblx0XHRcdC4uLnZhbGlkYXRpb24sXG5cdFx0XHRlcnJvcnM6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNvbnN0cmFpbnQsXG5cdFx0XHRcdFx0ZXJyb3I6IFR5cGVPZkNvbnN0cmFpbnQuU1VQRVJTRVQsXG5cdFx0XHRcdH0sXG5cdFx0XHRdLFxuXHRcdFx0aXNJbnZhbGlkOiB0cnVlLFxuXHRcdH0pXG5cdH0sXG4pXG5cbkRlbm8udGVzdChcblx0J1tzdXBlcnNldF0gcmV0dXJucyBlcnJvciBpZiB2YWx1ZSBzZXQgaXMgaWRlbnRpY2FsIHRvIGNvbnN0cmFpbnQgc2V0Jyxcblx0KCkgPT4ge1xuXHRcdGNvbnN0IHZhbGlkYXRpb246IFZhbGlkYXRpb24gPSB7XG5cdFx0XHRkYXRhdHlwZTogJ3NldCcsXG5cdFx0XHR2YWx1ZTogJ2N5YW4scmVkLHllbGxvdyxibHVlJyxcblx0XHR9XG5cblx0XHRhc3NlcnRFcXVhbHMoc3VwZXJzZXQoY29uc3RyYWludCkodmFsaWRhdGlvbiksIHtcblx0XHRcdC4uLnZhbGlkYXRpb24sXG5cdFx0XHRlcnJvcnM6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNvbnN0cmFpbnQsXG5cdFx0XHRcdFx0ZXJyb3I6IFR5cGVPZkNvbnN0cmFpbnQuU1VQRVJTRVQsXG5cdFx0XHRcdH0sXG5cdFx0XHRdLFxuXHRcdFx0aXNJbnZhbGlkOiB0cnVlLFxuXHRcdH0pXG5cdH0sXG4pXG4iXX0=