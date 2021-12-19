import makeIsDuration from './mod.ts';
import { TypeOfConstraint } from '../../../../types/enums.ts';
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts';
const constraint = {
    constraintType: TypeOfConstraint.IS_DURATION,
};
Deno.test('[makeIsDuration] returns correct validation when value is a date', () => {
    const validation = {
        datatype: 'duration',
        value: '2000-01-01',
    };
    assertEquals(makeIsDuration(constraint)(validation), validation);
});
Deno.test('[makeIsDuration] returns error when value is not a date', () => {
    const validation = {
        datatype: 'duration',
        value: 666,
    };
    assertEquals(makeIsDuration(constraint)(validation), {
        ...validation,
        isInvalid: true,
        errors: [
            {
                error: TypeOfConstraint.IS_DURATION,
                constraint,
                errorMessage: 'RangeError: invalid ISO 8601 string: 666',
            },
        ],
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb2QudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLGNBQWMsTUFBTSxVQUFVLENBQUE7QUFLckMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNEJBQTRCLENBQUE7QUFFN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtEQUFrRCxDQUFBO0FBRS9FLE1BQU0sVUFBVSxHQUEyQjtJQUMxQyxjQUFjLEVBQUUsZ0JBQWdCLENBQUMsV0FBVztDQUM1QyxDQUFBO0FBRUQsSUFBSSxDQUFDLElBQUksQ0FDUixrRUFBa0UsRUFDbEUsR0FBRyxFQUFFO0lBQ0osTUFBTSxVQUFVLEdBQWU7UUFDOUIsUUFBUSxFQUFFLFVBQVU7UUFDcEIsS0FBSyxFQUFFLFlBQVk7S0FDbkIsQ0FBQTtJQUVELFlBQVksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUE7QUFDakUsQ0FBQyxDQUNELENBQUE7QUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLHlEQUF5RCxFQUFFLEdBQUcsRUFBRTtJQUN6RSxNQUFNLFVBQVUsR0FBK0I7UUFDOUMsUUFBUSxFQUFFLFVBQVU7UUFFcEIsS0FBSyxFQUFFLEdBQUc7S0FDVixDQUFBO0lBRUQsWUFBWSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUNwRCxHQUFHLFVBQVU7UUFDYixTQUFTLEVBQUUsSUFBSTtRQUNmLE1BQU0sRUFBRTtZQUNQO2dCQUNDLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXO2dCQUNuQyxVQUFVO2dCQUNWLFlBQVksRUFBRSwwQ0FBMEM7YUFDeEQ7U0FDRDtLQUNELENBQUMsQ0FBQTtBQUNILENBQUMsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1ha2VJc0R1cmF0aW9uIGZyb20gJy4vbW9kLnRzJ1xuaW1wb3J0IHtcblx0RHVyYXRpb25UeXBlQ29uc3RyYWludCxcblx0VmFsaWRhdGlvbixcbn0gZnJvbSAnLi4vLi4vLi4vLi4vdHlwZXMvY29uc3RyYWludHMudHMnXG5pbXBvcnQgeyBUeXBlT2ZDb25zdHJhaW50IH0gZnJvbSAnLi4vLi4vLi4vLi4vdHlwZXMvZW51bXMudHMnXG5pbXBvcnQgdHlwZSB7IER1cmF0aW9uVmFsdWUgfSBmcm9tICcuLi8uLi8uLi8uLi90eXBlcy92YWx1ZXMudHMnXG5pbXBvcnQgeyBhc3NlcnRFcXVhbHMgfSBmcm9tICdodHRwczovL2Rlbm8ubGFuZC9zdGRAMC4xMTguMC90ZXN0aW5nL2Fzc2VydHMudHMnXG5cbmNvbnN0IGNvbnN0cmFpbnQ6IER1cmF0aW9uVHlwZUNvbnN0cmFpbnQgPSB7XG5cdGNvbnN0cmFpbnRUeXBlOiBUeXBlT2ZDb25zdHJhaW50LklTX0RVUkFUSU9OLFxufVxuXG5EZW5vLnRlc3QoXG5cdCdbbWFrZUlzRHVyYXRpb25dIHJldHVybnMgY29ycmVjdCB2YWxpZGF0aW9uIHdoZW4gdmFsdWUgaXMgYSBkYXRlJyxcblx0KCkgPT4ge1xuXHRcdGNvbnN0IHZhbGlkYXRpb246IFZhbGlkYXRpb24gPSB7XG5cdFx0XHRkYXRhdHlwZTogJ2R1cmF0aW9uJyxcblx0XHRcdHZhbHVlOiAnMjAwMC0wMS0wMScsXG5cdFx0fVxuXG5cdFx0YXNzZXJ0RXF1YWxzKG1ha2VJc0R1cmF0aW9uKGNvbnN0cmFpbnQpKHZhbGlkYXRpb24pLCB2YWxpZGF0aW9uKVxuXHR9LFxuKVxuXG5EZW5vLnRlc3QoJ1ttYWtlSXNEdXJhdGlvbl0gcmV0dXJucyBlcnJvciB3aGVuIHZhbHVlIGlzIG5vdCBhIGRhdGUnLCAoKSA9PiB7XG5cdGNvbnN0IHZhbGlkYXRpb246IFZhbGlkYXRpb24gJiBEdXJhdGlvblZhbHVlID0ge1xuXHRcdGRhdGF0eXBlOiAnZHVyYXRpb24nLFxuXHRcdC8vIEB0cy1pZ25vcmU6IGZvciB0ZXN0aW5nIHB1cnBvc2VzXG5cdFx0dmFsdWU6IDY2Nixcblx0fVxuXG5cdGFzc2VydEVxdWFscyhtYWtlSXNEdXJhdGlvbihjb25zdHJhaW50KSh2YWxpZGF0aW9uKSwge1xuXHRcdC4uLnZhbGlkYXRpb24sXG5cdFx0aXNJbnZhbGlkOiB0cnVlLFxuXHRcdGVycm9yczogW1xuXHRcdFx0e1xuXHRcdFx0XHRlcnJvcjogVHlwZU9mQ29uc3RyYWludC5JU19EVVJBVElPTixcblx0XHRcdFx0Y29uc3RyYWludCxcblx0XHRcdFx0ZXJyb3JNZXNzYWdlOiAnUmFuZ2VFcnJvcjogaW52YWxpZCBJU08gODYwMSBzdHJpbmc6IDY2NicsXG5cdFx0XHR9LFxuXHRcdF0sXG5cdH0pXG59KVxuIl19