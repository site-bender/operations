import atLeastN from './mod.ts';
import { TypeOfConstraint } from '../../../../types/enums.ts';
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts';
const constraint = {
    constraintType: TypeOfConstraint.AT_LEAST_N,
    operand: 42,
};
Deno.test('[atLeastN] returns correct validation if integer more than constraint value', () => {
    const validation = {
        datatype: 'integer',
        value: 43,
    };
    assertEquals(atLeastN(constraint)(validation), validation);
});
Deno.test('[atLeastN] returns correct validation if integer equals constraint value', () => {
    const validation = {
        datatype: 'integer',
        value: 42,
    };
    assertEquals(atLeastN(constraint)(validation), validation);
});
Deno.test('[atLeastN] returns error if integer less than constraint value', () => {
    const validation = {
        datatype: 'integer',
        value: 41,
    };
    assertEquals(atLeastN(constraint)(validation), {
        ...validation,
        errors: [
            {
                constraint,
                error: TypeOfConstraint.AT_LEAST_N,
            },
        ],
        isInvalid: true,
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb2QudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFFBQVEsTUFBTSxVQUFVLENBQUE7QUFLL0IsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNEJBQTRCLENBQUE7QUFDN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtEQUFrRCxDQUFBO0FBRS9FLE1BQU0sVUFBVSxHQUF1QjtJQUN0QyxjQUFjLEVBQUUsZ0JBQWdCLENBQUMsVUFBVTtJQUMzQyxPQUFPLEVBQUUsRUFBRTtDQUNYLENBQUE7QUFFRCxJQUFJLENBQUMsSUFBSSxDQUNSLDZFQUE2RSxFQUM3RSxHQUFHLEVBQUU7SUFDSixNQUFNLFVBQVUsR0FBZTtRQUM5QixRQUFRLEVBQUUsU0FBUztRQUNuQixLQUFLLEVBQUUsRUFBRTtLQUNULENBQUE7SUFFRCxZQUFZLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFBO0FBQzNELENBQUMsQ0FDRCxDQUFBO0FBRUQsSUFBSSxDQUFDLElBQUksQ0FDUiwwRUFBMEUsRUFDMUUsR0FBRyxFQUFFO0lBQ0osTUFBTSxVQUFVLEdBQWU7UUFDOUIsUUFBUSxFQUFFLFNBQVM7UUFDbkIsS0FBSyxFQUFFLEVBQUU7S0FDVCxDQUFBO0lBRUQsWUFBWSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQTtBQUMzRCxDQUFDLENBQ0QsQ0FBQTtBQUVELElBQUksQ0FBQyxJQUFJLENBQ1IsZ0VBQWdFLEVBQ2hFLEdBQUcsRUFBRTtJQUNKLE1BQU0sVUFBVSxHQUFlO1FBQzlCLFFBQVEsRUFBRSxTQUFTO1FBQ25CLEtBQUssRUFBRSxFQUFFO0tBQ1QsQ0FBQTtJQUVELFlBQVksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDOUMsR0FBRyxVQUFVO1FBQ2IsTUFBTSxFQUFFO1lBQ1A7Z0JBQ0MsVUFBVTtnQkFDVixLQUFLLEVBQUUsZ0JBQWdCLENBQUMsVUFBVTthQUNsQztTQUNEO1FBQ0QsU0FBUyxFQUFFLElBQUk7S0FDZixDQUFDLENBQUE7QUFDSCxDQUFDLENBQ0QsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhdExlYXN0TiBmcm9tICcuL21vZC50cydcbmltcG9ydCB7XG5cdEF0TGVhc3ROQ29uc3RyYWludCxcblx0VmFsaWRhdGlvbixcbn0gZnJvbSAnLi4vLi4vLi4vLi4vdHlwZXMvY29uc3RyYWludHMudHMnXG5pbXBvcnQgeyBUeXBlT2ZDb25zdHJhaW50IH0gZnJvbSAnLi4vLi4vLi4vLi4vdHlwZXMvZW51bXMudHMnXG5pbXBvcnQgeyBhc3NlcnRFcXVhbHMgfSBmcm9tICdodHRwczovL2Rlbm8ubGFuZC9zdGRAMC4xMTguMC90ZXN0aW5nL2Fzc2VydHMudHMnXG5cbmNvbnN0IGNvbnN0cmFpbnQ6IEF0TGVhc3ROQ29uc3RyYWludCA9IHtcblx0Y29uc3RyYWludFR5cGU6IFR5cGVPZkNvbnN0cmFpbnQuQVRfTEVBU1RfTixcblx0b3BlcmFuZDogNDIsXG59XG5cbkRlbm8udGVzdChcblx0J1thdExlYXN0Tl0gcmV0dXJucyBjb3JyZWN0IHZhbGlkYXRpb24gaWYgaW50ZWdlciBtb3JlIHRoYW4gY29uc3RyYWludCB2YWx1ZScsXG5cdCgpID0+IHtcblx0XHRjb25zdCB2YWxpZGF0aW9uOiBWYWxpZGF0aW9uID0ge1xuXHRcdFx0ZGF0YXR5cGU6ICdpbnRlZ2VyJyxcblx0XHRcdHZhbHVlOiA0Myxcblx0XHR9XG5cblx0XHRhc3NlcnRFcXVhbHMoYXRMZWFzdE4oY29uc3RyYWludCkodmFsaWRhdGlvbiksIHZhbGlkYXRpb24pXG5cdH0sXG4pXG5cbkRlbm8udGVzdChcblx0J1thdExlYXN0Tl0gcmV0dXJucyBjb3JyZWN0IHZhbGlkYXRpb24gaWYgaW50ZWdlciBlcXVhbHMgY29uc3RyYWludCB2YWx1ZScsXG5cdCgpID0+IHtcblx0XHRjb25zdCB2YWxpZGF0aW9uOiBWYWxpZGF0aW9uID0ge1xuXHRcdFx0ZGF0YXR5cGU6ICdpbnRlZ2VyJyxcblx0XHRcdHZhbHVlOiA0Mixcblx0XHR9XG5cblx0XHRhc3NlcnRFcXVhbHMoYXRMZWFzdE4oY29uc3RyYWludCkodmFsaWRhdGlvbiksIHZhbGlkYXRpb24pXG5cdH0sXG4pXG5cbkRlbm8udGVzdChcblx0J1thdExlYXN0Tl0gcmV0dXJucyBlcnJvciBpZiBpbnRlZ2VyIGxlc3MgdGhhbiBjb25zdHJhaW50IHZhbHVlJyxcblx0KCkgPT4ge1xuXHRcdGNvbnN0IHZhbGlkYXRpb246IFZhbGlkYXRpb24gPSB7XG5cdFx0XHRkYXRhdHlwZTogJ2ludGVnZXInLFxuXHRcdFx0dmFsdWU6IDQxLFxuXHRcdH1cblxuXHRcdGFzc2VydEVxdWFscyhhdExlYXN0Tihjb25zdHJhaW50KSh2YWxpZGF0aW9uKSwge1xuXHRcdFx0Li4udmFsaWRhdGlvbixcblx0XHRcdGVycm9yczogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y29uc3RyYWludCxcblx0XHRcdFx0XHRlcnJvcjogVHlwZU9mQ29uc3RyYWludC5BVF9MRUFTVF9OLFxuXHRcdFx0XHR9LFxuXHRcdFx0XSxcblx0XHRcdGlzSW52YWxpZDogdHJ1ZSxcblx0XHR9KVxuXHR9LFxuKVxuIl19