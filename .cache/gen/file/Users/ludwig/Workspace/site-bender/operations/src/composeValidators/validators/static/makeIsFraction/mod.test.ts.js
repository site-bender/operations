import makeIsFraction from './mod.ts';
import { TypeOfConstraint } from '../../../../types/enums.ts';
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts';
const constraint = {
    constraintType: TypeOfConstraint.IS_FRACTION,
};
Deno.test('[makeIsFraction] returns correct validation when value is a fraction', () => {
    const validation = {
        datatype: 'fraction',
        value: {
            denominator: 7,
            numerator: 22,
        },
    };
    assertEquals(makeIsFraction(constraint)(validation), validation);
});
Deno.test('[makeIsFraction] returns error when numerator is not a number', () => {
    const validation = {
        datatype: 'fraction',
        value: {
            denominator: 7,
            numerator: undefined,
        },
    };
    assertEquals(makeIsFraction(constraint)(validation), {
        ...validation,
        isInvalid: true,
        errors: [
            {
                error: TypeOfConstraint.IS_FRACTION,
                constraint,
            },
        ],
    });
});
Deno.test('[makeIsFraction] returns error when denominator is not a number', () => {
    const validation = {
        datatype: 'fraction',
        value: {
            denominator: undefined,
            numerator: 22,
        },
    };
    assertEquals(makeIsFraction(constraint)(validation), {
        ...validation,
        isInvalid: true,
        errors: [
            {
                error: TypeOfConstraint.IS_FRACTION,
                constraint,
            },
        ],
    });
});
Deno.test('[makeIsFraction] returns error when denominator is zero', () => {
    const validation = {
        datatype: 'fraction',
        value: {
            denominator: 0,
            numerator: 22,
        },
    };
    assertEquals(makeIsFraction(constraint)(validation), {
        ...validation,
        isInvalid: true,
        errors: [
            {
                error: TypeOfConstraint.IS_FRACTION,
                constraint,
            },
        ],
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb2QudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLGNBQWMsTUFBTSxVQUFVLENBQUE7QUFLckMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNEJBQTRCLENBQUE7QUFFN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtEQUFrRCxDQUFBO0FBRS9FLE1BQU0sVUFBVSxHQUEyQjtJQUMxQyxjQUFjLEVBQUUsZ0JBQWdCLENBQUMsV0FBVztDQUM1QyxDQUFBO0FBRUQsSUFBSSxDQUFDLElBQUksQ0FDUixzRUFBc0UsRUFDdEUsR0FBRyxFQUFFO0lBQ0osTUFBTSxVQUFVLEdBQWU7UUFDOUIsUUFBUSxFQUFFLFVBQVU7UUFDcEIsS0FBSyxFQUFFO1lBQ04sV0FBVyxFQUFFLENBQUM7WUFDZCxTQUFTLEVBQUUsRUFBRTtTQUNiO0tBQ0QsQ0FBQTtJQUVELFlBQVksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUE7QUFDakUsQ0FBQyxDQUNELENBQUE7QUFFRCxJQUFJLENBQUMsSUFBSSxDQUNSLCtEQUErRCxFQUMvRCxHQUFHLEVBQUU7SUFDSixNQUFNLFVBQVUsR0FBK0I7UUFDOUMsUUFBUSxFQUFFLFVBQVU7UUFDcEIsS0FBSyxFQUFFO1lBQ04sV0FBVyxFQUFFLENBQUM7WUFFZCxTQUFTLEVBQUUsU0FBUztTQUNwQjtLQUNELENBQUE7SUFFRCxZQUFZLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQ3BELEdBQUcsVUFBVTtRQUNiLFNBQVMsRUFBRSxJQUFJO1FBQ2YsTUFBTSxFQUFFO1lBQ1A7Z0JBQ0MsS0FBSyxFQUFFLGdCQUFnQixDQUFDLFdBQVc7Z0JBQ25DLFVBQVU7YUFDVjtTQUNEO0tBQ0QsQ0FBQyxDQUFBO0FBQ0gsQ0FBQyxDQUNELENBQUE7QUFFRCxJQUFJLENBQUMsSUFBSSxDQUNSLGlFQUFpRSxFQUNqRSxHQUFHLEVBQUU7SUFDSixNQUFNLFVBQVUsR0FBK0I7UUFDOUMsUUFBUSxFQUFFLFVBQVU7UUFDcEIsS0FBSyxFQUFFO1lBRU4sV0FBVyxFQUFFLFNBQVM7WUFDdEIsU0FBUyxFQUFFLEVBQUU7U0FDYjtLQUNELENBQUE7SUFFRCxZQUFZLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQ3BELEdBQUcsVUFBVTtRQUNiLFNBQVMsRUFBRSxJQUFJO1FBQ2YsTUFBTSxFQUFFO1lBQ1A7Z0JBQ0MsS0FBSyxFQUFFLGdCQUFnQixDQUFDLFdBQVc7Z0JBQ25DLFVBQVU7YUFDVjtTQUNEO0tBQ0QsQ0FBQyxDQUFBO0FBQ0gsQ0FBQyxDQUNELENBQUE7QUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLHlEQUF5RCxFQUFFLEdBQUcsRUFBRTtJQUN6RSxNQUFNLFVBQVUsR0FBZTtRQUM5QixRQUFRLEVBQUUsVUFBVTtRQUNwQixLQUFLLEVBQUU7WUFDTixXQUFXLEVBQUUsQ0FBQztZQUNkLFNBQVMsRUFBRSxFQUFFO1NBQ2I7S0FDRCxDQUFBO0lBRUQsWUFBWSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUNwRCxHQUFHLFVBQVU7UUFDYixTQUFTLEVBQUUsSUFBSTtRQUNmLE1BQU0sRUFBRTtZQUNQO2dCQUNDLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXO2dCQUNuQyxVQUFVO2FBQ1Y7U0FDRDtLQUNELENBQUMsQ0FBQTtBQUNILENBQUMsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1ha2VJc0ZyYWN0aW9uIGZyb20gJy4vbW9kLnRzJ1xuaW1wb3J0IHtcblx0RnJhY3Rpb25UeXBlQ29uc3RyYWludCxcblx0VmFsaWRhdGlvbixcbn0gZnJvbSAnLi4vLi4vLi4vLi4vdHlwZXMvY29uc3RyYWludHMudHMnXG5pbXBvcnQgeyBUeXBlT2ZDb25zdHJhaW50IH0gZnJvbSAnLi4vLi4vLi4vLi4vdHlwZXMvZW51bXMudHMnXG5pbXBvcnQgdHlwZSB7IEZyYWN0aW9uVmFsdWUgfSBmcm9tICcuLi8uLi8uLi8uLi90eXBlcy92YWx1ZXMudHMnXG5pbXBvcnQgeyBhc3NlcnRFcXVhbHMgfSBmcm9tICdodHRwczovL2Rlbm8ubGFuZC9zdGRAMC4xMTguMC90ZXN0aW5nL2Fzc2VydHMudHMnXG5cbmNvbnN0IGNvbnN0cmFpbnQ6IEZyYWN0aW9uVHlwZUNvbnN0cmFpbnQgPSB7XG5cdGNvbnN0cmFpbnRUeXBlOiBUeXBlT2ZDb25zdHJhaW50LklTX0ZSQUNUSU9OLFxufVxuXG5EZW5vLnRlc3QoXG5cdCdbbWFrZUlzRnJhY3Rpb25dIHJldHVybnMgY29ycmVjdCB2YWxpZGF0aW9uIHdoZW4gdmFsdWUgaXMgYSBmcmFjdGlvbicsXG5cdCgpID0+IHtcblx0XHRjb25zdCB2YWxpZGF0aW9uOiBWYWxpZGF0aW9uID0ge1xuXHRcdFx0ZGF0YXR5cGU6ICdmcmFjdGlvbicsXG5cdFx0XHR2YWx1ZToge1xuXHRcdFx0XHRkZW5vbWluYXRvcjogNyxcblx0XHRcdFx0bnVtZXJhdG9yOiAyMixcblx0XHRcdH0sXG5cdFx0fVxuXG5cdFx0YXNzZXJ0RXF1YWxzKG1ha2VJc0ZyYWN0aW9uKGNvbnN0cmFpbnQpKHZhbGlkYXRpb24pLCB2YWxpZGF0aW9uKVxuXHR9LFxuKVxuXG5EZW5vLnRlc3QoXG5cdCdbbWFrZUlzRnJhY3Rpb25dIHJldHVybnMgZXJyb3Igd2hlbiBudW1lcmF0b3IgaXMgbm90IGEgbnVtYmVyJyxcblx0KCkgPT4ge1xuXHRcdGNvbnN0IHZhbGlkYXRpb246IFZhbGlkYXRpb24gJiBGcmFjdGlvblZhbHVlID0ge1xuXHRcdFx0ZGF0YXR5cGU6ICdmcmFjdGlvbicsXG5cdFx0XHR2YWx1ZToge1xuXHRcdFx0XHRkZW5vbWluYXRvcjogNyxcblx0XHRcdFx0Ly8gQHRzLWlnbm9yZTogZm9yIHRlc3RpbmcgcHVycG9zZXNcblx0XHRcdFx0bnVtZXJhdG9yOiB1bmRlZmluZWQsXG5cdFx0XHR9LFxuXHRcdH1cblxuXHRcdGFzc2VydEVxdWFscyhtYWtlSXNGcmFjdGlvbihjb25zdHJhaW50KSh2YWxpZGF0aW9uKSwge1xuXHRcdFx0Li4udmFsaWRhdGlvbixcblx0XHRcdGlzSW52YWxpZDogdHJ1ZSxcblx0XHRcdGVycm9yczogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0ZXJyb3I6IFR5cGVPZkNvbnN0cmFpbnQuSVNfRlJBQ1RJT04sXG5cdFx0XHRcdFx0Y29uc3RyYWludCxcblx0XHRcdFx0fSxcblx0XHRcdF0sXG5cdFx0fSlcblx0fSxcbilcblxuRGVuby50ZXN0KFxuXHQnW21ha2VJc0ZyYWN0aW9uXSByZXR1cm5zIGVycm9yIHdoZW4gZGVub21pbmF0b3IgaXMgbm90IGEgbnVtYmVyJyxcblx0KCkgPT4ge1xuXHRcdGNvbnN0IHZhbGlkYXRpb246IFZhbGlkYXRpb24gJiBGcmFjdGlvblZhbHVlID0ge1xuXHRcdFx0ZGF0YXR5cGU6ICdmcmFjdGlvbicsXG5cdFx0XHR2YWx1ZToge1xuXHRcdFx0XHQvLyBAdHMtaWdub3JlOiBmb3IgdGVzdGluZyBwdXJwb3Nlc1xuXHRcdFx0XHRkZW5vbWluYXRvcjogdW5kZWZpbmVkLFxuXHRcdFx0XHRudW1lcmF0b3I6IDIyLFxuXHRcdFx0fSxcblx0XHR9XG5cblx0XHRhc3NlcnRFcXVhbHMobWFrZUlzRnJhY3Rpb24oY29uc3RyYWludCkodmFsaWRhdGlvbiksIHtcblx0XHRcdC4uLnZhbGlkYXRpb24sXG5cdFx0XHRpc0ludmFsaWQ6IHRydWUsXG5cdFx0XHRlcnJvcnM6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGVycm9yOiBUeXBlT2ZDb25zdHJhaW50LklTX0ZSQUNUSU9OLFxuXHRcdFx0XHRcdGNvbnN0cmFpbnQsXG5cdFx0XHRcdH0sXG5cdFx0XHRdLFxuXHRcdH0pXG5cdH0sXG4pXG5cbkRlbm8udGVzdCgnW21ha2VJc0ZyYWN0aW9uXSByZXR1cm5zIGVycm9yIHdoZW4gZGVub21pbmF0b3IgaXMgemVybycsICgpID0+IHtcblx0Y29uc3QgdmFsaWRhdGlvbjogVmFsaWRhdGlvbiA9IHtcblx0XHRkYXRhdHlwZTogJ2ZyYWN0aW9uJyxcblx0XHR2YWx1ZToge1xuXHRcdFx0ZGVub21pbmF0b3I6IDAsXG5cdFx0XHRudW1lcmF0b3I6IDIyLFxuXHRcdH0sXG5cdH1cblxuXHRhc3NlcnRFcXVhbHMobWFrZUlzRnJhY3Rpb24oY29uc3RyYWludCkodmFsaWRhdGlvbiksIHtcblx0XHQuLi52YWxpZGF0aW9uLFxuXHRcdGlzSW52YWxpZDogdHJ1ZSxcblx0XHRlcnJvcnM6IFtcblx0XHRcdHtcblx0XHRcdFx0ZXJyb3I6IFR5cGVPZkNvbnN0cmFpbnQuSVNfRlJBQ1RJT04sXG5cdFx0XHRcdGNvbnN0cmFpbnQsXG5cdFx0XHR9LFxuXHRcdF0sXG5cdH0pXG59KVxuIl19