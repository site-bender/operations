import makeIsInstant from './mod.ts';
import { TypeOfConstraint } from '../../../../types/enums.ts';
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts';
const constraint = {
    constraintType: TypeOfConstraint.IS_INSTANT,
};
Deno.test('[makeIsInstant] returns correct validation when value is a date', () => {
    const validation = {
        datatype: 'instant',
        value: '2000-01-01',
    };
    assertEquals(makeIsInstant(constraint)(validation), validation);
});
Deno.test('[makeIsInstant] returns error when value is not a date', () => {
    const validation = {
        datatype: 'instant',
        value: 666,
    };
    assertEquals(makeIsInstant(constraint)(validation), {
        ...validation,
        isInvalid: true,
        errors: [
            {
                error: TypeOfConstraint.IS_INSTANT,
                constraint,
                errorMessage: 'RangeError: invalid ISO 8601 string: 666',
            },
        ],
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb2QudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLGFBQWEsTUFBTSxVQUFVLENBQUE7QUFLcEMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNEJBQTRCLENBQUE7QUFFN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtEQUFrRCxDQUFBO0FBRS9FLE1BQU0sVUFBVSxHQUEwQjtJQUN6QyxjQUFjLEVBQUUsZ0JBQWdCLENBQUMsVUFBVTtDQUMzQyxDQUFBO0FBRUQsSUFBSSxDQUFDLElBQUksQ0FDUixpRUFBaUUsRUFDakUsR0FBRyxFQUFFO0lBQ0osTUFBTSxVQUFVLEdBQWU7UUFDOUIsUUFBUSxFQUFFLFNBQVM7UUFDbkIsS0FBSyxFQUFFLFlBQVk7S0FDbkIsQ0FBQTtJQUVELFlBQVksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUE7QUFDaEUsQ0FBQyxDQUNELENBQUE7QUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLHdEQUF3RCxFQUFFLEdBQUcsRUFBRTtJQUN4RSxNQUFNLFVBQVUsR0FBOEI7UUFDN0MsUUFBUSxFQUFFLFNBQVM7UUFFbkIsS0FBSyxFQUFFLEdBQUc7S0FDVixDQUFBO0lBRUQsWUFBWSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUNuRCxHQUFHLFVBQVU7UUFDYixTQUFTLEVBQUUsSUFBSTtRQUNmLE1BQU0sRUFBRTtZQUNQO2dCQUNDLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxVQUFVO2dCQUNsQyxVQUFVO2dCQUNWLFlBQVksRUFBRSwwQ0FBMEM7YUFDeEQ7U0FDRDtLQUNELENBQUMsQ0FBQTtBQUNILENBQUMsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1ha2VJc0luc3RhbnQgZnJvbSAnLi9tb2QudHMnXG5pbXBvcnQge1xuXHRJbnN0YW50VHlwZUNvbnN0cmFpbnQsXG5cdFZhbGlkYXRpb24sXG59IGZyb20gJy4uLy4uLy4uLy4uL3R5cGVzL2NvbnN0cmFpbnRzLnRzJ1xuaW1wb3J0IHsgVHlwZU9mQ29uc3RyYWludCB9IGZyb20gJy4uLy4uLy4uLy4uL3R5cGVzL2VudW1zLnRzJ1xuaW1wb3J0IHR5cGUgeyBJbnN0YW50VmFsdWUgfSBmcm9tICcuLi8uLi8uLi8uLi90eXBlcy92YWx1ZXMudHMnXG5pbXBvcnQgeyBhc3NlcnRFcXVhbHMgfSBmcm9tICdodHRwczovL2Rlbm8ubGFuZC9zdGRAMC4xMTguMC90ZXN0aW5nL2Fzc2VydHMudHMnXG5cbmNvbnN0IGNvbnN0cmFpbnQ6IEluc3RhbnRUeXBlQ29uc3RyYWludCA9IHtcblx0Y29uc3RyYWludFR5cGU6IFR5cGVPZkNvbnN0cmFpbnQuSVNfSU5TVEFOVCxcbn1cblxuRGVuby50ZXN0KFxuXHQnW21ha2VJc0luc3RhbnRdIHJldHVybnMgY29ycmVjdCB2YWxpZGF0aW9uIHdoZW4gdmFsdWUgaXMgYSBkYXRlJyxcblx0KCkgPT4ge1xuXHRcdGNvbnN0IHZhbGlkYXRpb246IFZhbGlkYXRpb24gPSB7XG5cdFx0XHRkYXRhdHlwZTogJ2luc3RhbnQnLFxuXHRcdFx0dmFsdWU6ICcyMDAwLTAxLTAxJyxcblx0XHR9XG5cblx0XHRhc3NlcnRFcXVhbHMobWFrZUlzSW5zdGFudChjb25zdHJhaW50KSh2YWxpZGF0aW9uKSwgdmFsaWRhdGlvbilcblx0fSxcbilcblxuRGVuby50ZXN0KCdbbWFrZUlzSW5zdGFudF0gcmV0dXJucyBlcnJvciB3aGVuIHZhbHVlIGlzIG5vdCBhIGRhdGUnLCAoKSA9PiB7XG5cdGNvbnN0IHZhbGlkYXRpb246IFZhbGlkYXRpb24gJiBJbnN0YW50VmFsdWUgPSB7XG5cdFx0ZGF0YXR5cGU6ICdpbnN0YW50Jyxcblx0XHQvLyBAdHMtaWdub3JlOiBmb3IgdGVzdGluZyBwdXJwb3Nlc1xuXHRcdHZhbHVlOiA2NjYsXG5cdH1cblxuXHRhc3NlcnRFcXVhbHMobWFrZUlzSW5zdGFudChjb25zdHJhaW50KSh2YWxpZGF0aW9uKSwge1xuXHRcdC4uLnZhbGlkYXRpb24sXG5cdFx0aXNJbnZhbGlkOiB0cnVlLFxuXHRcdGVycm9yczogW1xuXHRcdFx0e1xuXHRcdFx0XHRlcnJvcjogVHlwZU9mQ29uc3RyYWludC5JU19JTlNUQU5ULFxuXHRcdFx0XHRjb25zdHJhaW50LFxuXHRcdFx0XHRlcnJvck1lc3NhZ2U6ICdSYW5nZUVycm9yOiBpbnZhbGlkIElTTyA4NjAxIHN0cmluZzogNjY2Jyxcblx0XHRcdH0sXG5cdFx0XSxcblx0fSlcbn0pXG4iXX0=