import disjointSet from './mod.ts';
import { TypeOfConstraint } from '../../../../types/enums.ts';
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts';
const constraint = {
    constraintType: TypeOfConstraint.DISJOINT_SET,
    operand: 'red,blue,green',
};
Deno.test('[disjointSet] returns correct validation if value set and constraint set share no members', () => {
    const validation = {
        datatype: 'set',
        value: 'cyan,magenta,yellow,black',
    };
    assertEquals(disjointSet(constraint)(validation), validation);
});
Deno.test('[disjointSet] returns correct validation with arrays', () => {
    const validation = {
        datatype: 'set',
        value: ['cyan', 'magenta', 'yellow', 'black'],
    };
    assertEquals(disjointSet({
        ...constraint,
        operand: ['red', 'green', 'blue'],
    })(validation), validation);
});
Deno.test('[disjointSet] returns correct validation with sets', () => {
    const validation = {
        datatype: 'set',
        value: new Set(['cyan', 'magenta', 'yellow', 'black']),
    };
    assertEquals(disjointSet({
        ...constraint,
        operand: new Set(['red', 'green', 'blue']),
    })(validation), validation);
});
Deno.test('[disjointSet] returns error if value set and constraint set share members', () => {
    const validation = {
        datatype: 'set',
        value: 'red,yellow,black',
    };
    assertEquals(disjointSet(constraint)(validation), {
        ...validation,
        errors: [
            {
                constraint,
                error: TypeOfConstraint.DISJOINT_SET,
            },
        ],
        isInvalid: true,
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb2QudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFdBQVcsTUFBTSxVQUFVLENBQUE7QUFLbEMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNEJBQTRCLENBQUE7QUFDN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtEQUFrRCxDQUFBO0FBRS9FLE1BQU0sVUFBVSxHQUEwQjtJQUN6QyxjQUFjLEVBQUUsZ0JBQWdCLENBQUMsWUFBWTtJQUM3QyxPQUFPLEVBQUUsZ0JBQWdCO0NBQ3pCLENBQUE7QUFFRCxJQUFJLENBQUMsSUFBSSxDQUNSLDJGQUEyRixFQUMzRixHQUFHLEVBQUU7SUFDSixNQUFNLFVBQVUsR0FBZTtRQUM5QixRQUFRLEVBQUUsS0FBSztRQUNmLEtBQUssRUFBRSwyQkFBMkI7S0FDbEMsQ0FBQTtJQUVELFlBQVksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUE7QUFDOUQsQ0FBQyxDQUNELENBQUE7QUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLHNEQUFzRCxFQUFFLEdBQUcsRUFBRTtJQUN0RSxNQUFNLFVBQVUsR0FBZTtRQUM5QixRQUFRLEVBQUUsS0FBSztRQUNmLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQztLQUM3QyxDQUFBO0lBRUQsWUFBWSxDQUNYLFdBQVcsQ0FBQztRQUNYLEdBQUcsVUFBVTtRQUNiLE9BQU8sRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDO0tBQ2pDLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFDZCxVQUFVLENBQ1YsQ0FBQTtBQUNGLENBQUMsQ0FBQyxDQUFBO0FBRUYsSUFBSSxDQUFDLElBQUksQ0FBQyxvREFBb0QsRUFBRSxHQUFHLEVBQUU7SUFDcEUsTUFBTSxVQUFVLEdBQWU7UUFDOUIsUUFBUSxFQUFFLEtBQUs7UUFDZixLQUFLLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztLQUN0RCxDQUFBO0lBRUQsWUFBWSxDQUNYLFdBQVcsQ0FBQztRQUNYLEdBQUcsVUFBVTtRQUNiLE9BQU8sRUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FDMUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUNkLFVBQVUsQ0FDVixDQUFBO0FBQ0YsQ0FBQyxDQUFDLENBQUE7QUFFRixJQUFJLENBQUMsSUFBSSxDQUNSLDJFQUEyRSxFQUMzRSxHQUFHLEVBQUU7SUFDSixNQUFNLFVBQVUsR0FBZTtRQUM5QixRQUFRLEVBQUUsS0FBSztRQUNmLEtBQUssRUFBRSxrQkFBa0I7S0FDekIsQ0FBQTtJQUVELFlBQVksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDakQsR0FBRyxVQUFVO1FBQ2IsTUFBTSxFQUFFO1lBQ1A7Z0JBQ0MsVUFBVTtnQkFDVixLQUFLLEVBQUUsZ0JBQWdCLENBQUMsWUFBWTthQUNwQztTQUNEO1FBQ0QsU0FBUyxFQUFFLElBQUk7S0FDZixDQUFDLENBQUE7QUFDSCxDQUFDLENBQ0QsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkaXNqb2ludFNldCBmcm9tICcuL21vZC50cydcbmltcG9ydCB7XG5cdERpc2pvaW50U2V0Q29uc3RyYWludCxcblx0VmFsaWRhdGlvbixcbn0gZnJvbSAnLi4vLi4vLi4vLi4vdHlwZXMvY29uc3RyYWludHMudHMnXG5pbXBvcnQgeyBUeXBlT2ZDb25zdHJhaW50IH0gZnJvbSAnLi4vLi4vLi4vLi4vdHlwZXMvZW51bXMudHMnXG5pbXBvcnQgeyBhc3NlcnRFcXVhbHMgfSBmcm9tICdodHRwczovL2Rlbm8ubGFuZC9zdGRAMC4xMTguMC90ZXN0aW5nL2Fzc2VydHMudHMnXG5cbmNvbnN0IGNvbnN0cmFpbnQ6IERpc2pvaW50U2V0Q29uc3RyYWludCA9IHtcblx0Y29uc3RyYWludFR5cGU6IFR5cGVPZkNvbnN0cmFpbnQuRElTSk9JTlRfU0VULFxuXHRvcGVyYW5kOiAncmVkLGJsdWUsZ3JlZW4nLFxufVxuXG5EZW5vLnRlc3QoXG5cdCdbZGlzam9pbnRTZXRdIHJldHVybnMgY29ycmVjdCB2YWxpZGF0aW9uIGlmIHZhbHVlIHNldCBhbmQgY29uc3RyYWludCBzZXQgc2hhcmUgbm8gbWVtYmVycycsXG5cdCgpID0+IHtcblx0XHRjb25zdCB2YWxpZGF0aW9uOiBWYWxpZGF0aW9uID0ge1xuXHRcdFx0ZGF0YXR5cGU6ICdzZXQnLFxuXHRcdFx0dmFsdWU6ICdjeWFuLG1hZ2VudGEseWVsbG93LGJsYWNrJyxcblx0XHR9XG5cblx0XHRhc3NlcnRFcXVhbHMoZGlzam9pbnRTZXQoY29uc3RyYWludCkodmFsaWRhdGlvbiksIHZhbGlkYXRpb24pXG5cdH0sXG4pXG5cbkRlbm8udGVzdCgnW2Rpc2pvaW50U2V0XSByZXR1cm5zIGNvcnJlY3QgdmFsaWRhdGlvbiB3aXRoIGFycmF5cycsICgpID0+IHtcblx0Y29uc3QgdmFsaWRhdGlvbjogVmFsaWRhdGlvbiA9IHtcblx0XHRkYXRhdHlwZTogJ3NldCcsXG5cdFx0dmFsdWU6IFsnY3lhbicsICdtYWdlbnRhJywgJ3llbGxvdycsICdibGFjayddLFxuXHR9XG5cblx0YXNzZXJ0RXF1YWxzKFxuXHRcdGRpc2pvaW50U2V0KHtcblx0XHRcdC4uLmNvbnN0cmFpbnQsXG5cdFx0XHRvcGVyYW5kOiBbJ3JlZCcsICdncmVlbicsICdibHVlJ10sXG5cdFx0fSkodmFsaWRhdGlvbiksXG5cdFx0dmFsaWRhdGlvbixcblx0KVxufSlcblxuRGVuby50ZXN0KCdbZGlzam9pbnRTZXRdIHJldHVybnMgY29ycmVjdCB2YWxpZGF0aW9uIHdpdGggc2V0cycsICgpID0+IHtcblx0Y29uc3QgdmFsaWRhdGlvbjogVmFsaWRhdGlvbiA9IHtcblx0XHRkYXRhdHlwZTogJ3NldCcsXG5cdFx0dmFsdWU6IG5ldyBTZXQoWydjeWFuJywgJ21hZ2VudGEnLCAneWVsbG93JywgJ2JsYWNrJ10pLFxuXHR9XG5cblx0YXNzZXJ0RXF1YWxzKFxuXHRcdGRpc2pvaW50U2V0KHtcblx0XHRcdC4uLmNvbnN0cmFpbnQsXG5cdFx0XHRvcGVyYW5kOiBuZXcgU2V0KFsncmVkJywgJ2dyZWVuJywgJ2JsdWUnXSksXG5cdFx0fSkodmFsaWRhdGlvbiksXG5cdFx0dmFsaWRhdGlvbixcblx0KVxufSlcblxuRGVuby50ZXN0KFxuXHQnW2Rpc2pvaW50U2V0XSByZXR1cm5zIGVycm9yIGlmIHZhbHVlIHNldCBhbmQgY29uc3RyYWludCBzZXQgc2hhcmUgbWVtYmVycycsXG5cdCgpID0+IHtcblx0XHRjb25zdCB2YWxpZGF0aW9uOiBWYWxpZGF0aW9uID0ge1xuXHRcdFx0ZGF0YXR5cGU6ICdzZXQnLFxuXHRcdFx0dmFsdWU6ICdyZWQseWVsbG93LGJsYWNrJyxcblx0XHR9XG5cblx0XHRhc3NlcnRFcXVhbHMoZGlzam9pbnRTZXQoY29uc3RyYWludCkodmFsaWRhdGlvbiksIHtcblx0XHRcdC4uLnZhbGlkYXRpb24sXG5cdFx0XHRlcnJvcnM6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNvbnN0cmFpbnQsXG5cdFx0XHRcdFx0ZXJyb3I6IFR5cGVPZkNvbnN0cmFpbnQuRElTSk9JTlRfU0VULFxuXHRcdFx0XHR9LFxuXHRcdFx0XSxcblx0XHRcdGlzSW52YWxpZDogdHJ1ZSxcblx0XHR9KVxuXHR9LFxuKVxuIl19