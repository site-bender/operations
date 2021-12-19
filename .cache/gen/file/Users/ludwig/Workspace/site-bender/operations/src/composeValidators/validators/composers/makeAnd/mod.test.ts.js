import and from './mod.ts';
import { TypeOfConstraint } from '../../../../types/enums.ts';
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts';
const constraint = {
    constraintType: TypeOfConstraint.AND,
    tests: [
        {
            constraintType: TypeOfConstraint.AT_LEAST_N,
            operand: 25,
        },
        {
            constraintType: TypeOfConstraint.AT_MOST_N,
            operand: 75,
        },
    ],
};
const validate = and(constraint);
Deno.test('[and] passes when all constraint checks pass', () => {
    const validation = {
        numberType: 'integer',
        datatype: 'integer',
        value: 50,
    };
    assertEquals(validate(validation), validation);
});
Deno.test('[and] fails when any constraint checks fails', () => {
    const validation = {
        numberType: 'integer',
        datatype: 'integer',
        value: 0,
    };
    assertEquals(validate(validation), {
        ...validation,
        isInvalid: true,
        errors: [
            {
                constraint: {
                    constraintType: TypeOfConstraint.AND,
                    tests: [
                        {
                            constraintType: TypeOfConstraint.AT_LEAST_N,
                            datatype: 'integer',
                            operand: 25,
                        },
                        {
                            constraintType: TypeOfConstraint.AT_MOST_N,
                            datatype: 'integer',
                            operand: 75,
                        },
                    ],
                },
                error: TypeOfConstraint.AND,
                errors: [
                    {
                        error: TypeOfConstraint.AT_LEAST_N,
                        constraint: {
                            constraintType: TypeOfConstraint.AT_LEAST_N,
                            datatype: 'integer',
                            operand: 25,
                        },
                    },
                ],
            },
        ],
    });
    const validation2 = {
        numberType: 'integer',
        datatype: 'integer',
        value: 100,
    };
    assertEquals(validate(validation2), {
        ...validation2,
        isInvalid: true,
        errors: [
            {
                constraint: {
                    constraintType: TypeOfConstraint.AND,
                    tests: [
                        {
                            constraintType: TypeOfConstraint.AT_LEAST_N,
                            datatype: 'integer',
                            operand: 25,
                        },
                        {
                            constraintType: TypeOfConstraint.AT_MOST_N,
                            datatype: 'integer',
                            operand: 75,
                        },
                    ],
                },
                error: TypeOfConstraint.AND,
                errors: [
                    {
                        error: TypeOfConstraint.AT_MOST_N,
                        constraint: {
                            constraintType: TypeOfConstraint.AT_MOST_N,
                            datatype: 'integer',
                            operand: 75,
                        },
                    },
                ],
            },
        ],
    });
});
Deno.test('[and] fails when both constraint checks fail', () => {
    const validator = and({
        constraintType: TypeOfConstraint.AND,
        tests: [
            {
                constraintType: TypeOfConstraint.AT_LEAST_N,
                operand: 75,
            },
            {
                constraintType: TypeOfConstraint.AT_MOST_N,
                operand: 25,
            },
        ],
    });
    const validation = {
        numberType: 'integer',
        datatype: 'integer',
        value: 50,
    };
    assertEquals(validator(validation), {
        ...validation,
        isInvalid: true,
        errors: [
            {
                constraint: {
                    constraintType: TypeOfConstraint.AND,
                    tests: [
                        {
                            constraintType: TypeOfConstraint.AT_LEAST_N,
                            datatype: 'integer',
                            operand: 75,
                        },
                        {
                            constraintType: TypeOfConstraint.AT_MOST_N,
                            datatype: 'integer',
                            operand: 25,
                        },
                    ],
                },
                error: TypeOfConstraint.AND,
                errors: [
                    {
                        error: TypeOfConstraint.AT_LEAST_N,
                        constraint: {
                            constraintType: TypeOfConstraint.AT_LEAST_N,
                            datatype: 'integer',
                            operand: 75,
                        },
                    },
                    {
                        error: TypeOfConstraint.AT_MOST_N,
                        constraint: {
                            constraintType: TypeOfConstraint.AT_MOST_N,
                            datatype: 'integer',
                            operand: 25,
                        },
                    },
                ],
            },
        ],
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb2QudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEdBQUcsTUFBTSxVQUFVLENBQUE7QUFLMUIsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNEJBQTRCLENBQUE7QUFDN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtEQUFrRCxDQUFBO0FBRS9FLE1BQU0sVUFBVSxHQUFrQjtJQUNqQyxjQUFjLEVBQUUsZ0JBQWdCLENBQUMsR0FBRztJQUNwQyxLQUFLLEVBQUU7UUFDTjtZQUNDLGNBQWMsRUFBRSxnQkFBZ0IsQ0FBQyxVQUFVO1lBQzNDLE9BQU8sRUFBRSxFQUFFO1NBQ1g7UUFDRDtZQUNDLGNBQWMsRUFBRSxnQkFBZ0IsQ0FBQyxTQUFTO1lBQzFDLE9BQU8sRUFBRSxFQUFFO1NBQ1g7S0FDRDtDQUNELENBQUE7QUFFRCxNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUE7QUFFaEMsSUFBSSxDQUFDLElBQUksQ0FBQyw4Q0FBOEMsRUFBRSxHQUFHLEVBQUU7SUFDOUQsTUFBTSxVQUFVLEdBQWU7UUFDOUIsVUFBVSxFQUFFLFNBQVM7UUFDckIsUUFBUSxFQUFFLFNBQVM7UUFDbkIsS0FBSyxFQUFFLEVBQUU7S0FDVCxDQUFBO0lBRUQsWUFBWSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQTtBQUMvQyxDQUFDLENBQUMsQ0FBQTtBQUVGLElBQUksQ0FBQyxJQUFJLENBQUMsOENBQThDLEVBQUUsR0FBRyxFQUFFO0lBQzlELE1BQU0sVUFBVSxHQUFlO1FBQzlCLFVBQVUsRUFBRSxTQUFTO1FBQ3JCLFFBQVEsRUFBRSxTQUFTO1FBQ25CLEtBQUssRUFBRSxDQUFDO0tBQ1IsQ0FBQTtJQUVELFlBQVksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDbEMsR0FBRyxVQUFVO1FBQ2IsU0FBUyxFQUFFLElBQUk7UUFDZixNQUFNLEVBQUU7WUFDUDtnQkFDQyxVQUFVLEVBQUU7b0JBQ1gsY0FBYyxFQUFFLGdCQUFnQixDQUFDLEdBQUc7b0JBQ3BDLEtBQUssRUFBRTt3QkFDTjs0QkFDQyxjQUFjLEVBQUUsZ0JBQWdCLENBQUMsVUFBVTs0QkFDM0MsUUFBUSxFQUFFLFNBQVM7NEJBQ25CLE9BQU8sRUFBRSxFQUFFO3lCQUNYO3dCQUNEOzRCQUNDLGNBQWMsRUFBRSxnQkFBZ0IsQ0FBQyxTQUFTOzRCQUMxQyxRQUFRLEVBQUUsU0FBUzs0QkFDbkIsT0FBTyxFQUFFLEVBQUU7eUJBQ1g7cUJBQ0Q7aUJBQ0Q7Z0JBQ0QsS0FBSyxFQUFFLGdCQUFnQixDQUFDLEdBQUc7Z0JBQzNCLE1BQU0sRUFBRTtvQkFDUDt3QkFDQyxLQUFLLEVBQUUsZ0JBQWdCLENBQUMsVUFBVTt3QkFDbEMsVUFBVSxFQUFFOzRCQUNYLGNBQWMsRUFBRSxnQkFBZ0IsQ0FBQyxVQUFVOzRCQUMzQyxRQUFRLEVBQUUsU0FBUzs0QkFDbkIsT0FBTyxFQUFFLEVBQUU7eUJBQ1g7cUJBQ0Q7aUJBQ0Q7YUFDRDtTQUNEO0tBQ0QsQ0FBQyxDQUFBO0lBRUYsTUFBTSxXQUFXLEdBQWU7UUFDL0IsVUFBVSxFQUFFLFNBQVM7UUFDckIsUUFBUSxFQUFFLFNBQVM7UUFDbkIsS0FBSyxFQUFFLEdBQUc7S0FDVixDQUFBO0lBRUQsWUFBWSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTtRQUNuQyxHQUFHLFdBQVc7UUFDZCxTQUFTLEVBQUUsSUFBSTtRQUNmLE1BQU0sRUFBRTtZQUNQO2dCQUNDLFVBQVUsRUFBRTtvQkFDWCxjQUFjLEVBQUUsZ0JBQWdCLENBQUMsR0FBRztvQkFDcEMsS0FBSyxFQUFFO3dCQUNOOzRCQUNDLGNBQWMsRUFBRSxnQkFBZ0IsQ0FBQyxVQUFVOzRCQUMzQyxRQUFRLEVBQUUsU0FBUzs0QkFDbkIsT0FBTyxFQUFFLEVBQUU7eUJBQ1g7d0JBQ0Q7NEJBQ0MsY0FBYyxFQUFFLGdCQUFnQixDQUFDLFNBQVM7NEJBQzFDLFFBQVEsRUFBRSxTQUFTOzRCQUNuQixPQUFPLEVBQUUsRUFBRTt5QkFDWDtxQkFDRDtpQkFDRDtnQkFDRCxLQUFLLEVBQUUsZ0JBQWdCLENBQUMsR0FBRztnQkFDM0IsTUFBTSxFQUFFO29CQUNQO3dCQUNDLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxTQUFTO3dCQUNqQyxVQUFVLEVBQUU7NEJBQ1gsY0FBYyxFQUFFLGdCQUFnQixDQUFDLFNBQVM7NEJBQzFDLFFBQVEsRUFBRSxTQUFTOzRCQUNuQixPQUFPLEVBQUUsRUFBRTt5QkFDWDtxQkFDRDtpQkFDRDthQUNEO1NBQ0Q7S0FDRCxDQUFDLENBQUE7QUFDSCxDQUFDLENBQUMsQ0FBQTtBQUVGLElBQUksQ0FBQyxJQUFJLENBQUMsOENBQThDLEVBQUUsR0FBRyxFQUFFO0lBQzlELE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQztRQUNyQixjQUFjLEVBQUUsZ0JBQWdCLENBQUMsR0FBRztRQUNwQyxLQUFLLEVBQUU7WUFDTjtnQkFDQyxjQUFjLEVBQUUsZ0JBQWdCLENBQUMsVUFBVTtnQkFDM0MsT0FBTyxFQUFFLEVBQUU7YUFDWDtZQUNEO2dCQUNDLGNBQWMsRUFBRSxnQkFBZ0IsQ0FBQyxTQUFTO2dCQUMxQyxPQUFPLEVBQUUsRUFBRTthQUNYO1NBQ0Q7S0FDRCxDQUFDLENBQUE7SUFFRixNQUFNLFVBQVUsR0FBZTtRQUM5QixVQUFVLEVBQUUsU0FBUztRQUNyQixRQUFRLEVBQUUsU0FBUztRQUNuQixLQUFLLEVBQUUsRUFBRTtLQUNULENBQUE7SUFFRCxZQUFZLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQ25DLEdBQUcsVUFBVTtRQUNiLFNBQVMsRUFBRSxJQUFJO1FBQ2YsTUFBTSxFQUFFO1lBQ1A7Z0JBQ0MsVUFBVSxFQUFFO29CQUNYLGNBQWMsRUFBRSxnQkFBZ0IsQ0FBQyxHQUFHO29CQUNwQyxLQUFLLEVBQUU7d0JBQ047NEJBQ0MsY0FBYyxFQUFFLGdCQUFnQixDQUFDLFVBQVU7NEJBQzNDLFFBQVEsRUFBRSxTQUFTOzRCQUNuQixPQUFPLEVBQUUsRUFBRTt5QkFDWDt3QkFDRDs0QkFDQyxjQUFjLEVBQUUsZ0JBQWdCLENBQUMsU0FBUzs0QkFDMUMsUUFBUSxFQUFFLFNBQVM7NEJBQ25CLE9BQU8sRUFBRSxFQUFFO3lCQUNYO3FCQUNEO2lCQUNEO2dCQUNELEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxHQUFHO2dCQUMzQixNQUFNLEVBQUU7b0JBQ1A7d0JBQ0MsS0FBSyxFQUFFLGdCQUFnQixDQUFDLFVBQVU7d0JBQ2xDLFVBQVUsRUFBRTs0QkFDWCxjQUFjLEVBQUUsZ0JBQWdCLENBQUMsVUFBVTs0QkFDM0MsUUFBUSxFQUFFLFNBQVM7NEJBQ25CLE9BQU8sRUFBRSxFQUFFO3lCQUNYO3FCQUNEO29CQUNEO3dCQUNDLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxTQUFTO3dCQUNqQyxVQUFVLEVBQUU7NEJBQ1gsY0FBYyxFQUFFLGdCQUFnQixDQUFDLFNBQVM7NEJBQzFDLFFBQVEsRUFBRSxTQUFTOzRCQUNuQixPQUFPLEVBQUUsRUFBRTt5QkFDWDtxQkFDRDtpQkFDRDthQUNEO1NBQ0Q7S0FDRCxDQUFDLENBQUE7QUFDSCxDQUFDLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhbmQgZnJvbSAnLi9tb2QudHMnXG5pbXBvcnQgdHlwZSB7XG5cdEFuZENvbnN0cmFpbnQsXG5cdFZhbGlkYXRpb24sXG59IGZyb20gJy4uLy4uLy4uLy4uL3R5cGVzL2NvbnN0cmFpbnRzLnRzJ1xuaW1wb3J0IHsgVHlwZU9mQ29uc3RyYWludCB9IGZyb20gJy4uLy4uLy4uLy4uL3R5cGVzL2VudW1zLnRzJ1xuaW1wb3J0IHsgYXNzZXJ0RXF1YWxzIH0gZnJvbSAnaHR0cHM6Ly9kZW5vLmxhbmQvc3RkQDAuMTE4LjAvdGVzdGluZy9hc3NlcnRzLnRzJ1xuXG5jb25zdCBjb25zdHJhaW50OiBBbmRDb25zdHJhaW50ID0ge1xuXHRjb25zdHJhaW50VHlwZTogVHlwZU9mQ29uc3RyYWludC5BTkQsXG5cdHRlc3RzOiBbXG5cdFx0e1xuXHRcdFx0Y29uc3RyYWludFR5cGU6IFR5cGVPZkNvbnN0cmFpbnQuQVRfTEVBU1RfTixcblx0XHRcdG9wZXJhbmQ6IDI1LFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0Y29uc3RyYWludFR5cGU6IFR5cGVPZkNvbnN0cmFpbnQuQVRfTU9TVF9OLFxuXHRcdFx0b3BlcmFuZDogNzUsXG5cdFx0fSxcblx0XSxcbn1cblxuY29uc3QgdmFsaWRhdGUgPSBhbmQoY29uc3RyYWludClcblxuRGVuby50ZXN0KCdbYW5kXSBwYXNzZXMgd2hlbiBhbGwgY29uc3RyYWludCBjaGVja3MgcGFzcycsICgpID0+IHtcblx0Y29uc3QgdmFsaWRhdGlvbjogVmFsaWRhdGlvbiA9IHtcblx0XHRudW1iZXJUeXBlOiAnaW50ZWdlcicsXG5cdFx0ZGF0YXR5cGU6ICdpbnRlZ2VyJyxcblx0XHR2YWx1ZTogNTAsXG5cdH1cblxuXHRhc3NlcnRFcXVhbHModmFsaWRhdGUodmFsaWRhdGlvbiksIHZhbGlkYXRpb24pXG59KVxuXG5EZW5vLnRlc3QoJ1thbmRdIGZhaWxzIHdoZW4gYW55IGNvbnN0cmFpbnQgY2hlY2tzIGZhaWxzJywgKCkgPT4ge1xuXHRjb25zdCB2YWxpZGF0aW9uOiBWYWxpZGF0aW9uID0ge1xuXHRcdG51bWJlclR5cGU6ICdpbnRlZ2VyJyxcblx0XHRkYXRhdHlwZTogJ2ludGVnZXInLFxuXHRcdHZhbHVlOiAwLFxuXHR9XG5cblx0YXNzZXJ0RXF1YWxzKHZhbGlkYXRlKHZhbGlkYXRpb24pLCB7XG5cdFx0Li4udmFsaWRhdGlvbixcblx0XHRpc0ludmFsaWQ6IHRydWUsXG5cdFx0ZXJyb3JzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdGNvbnN0cmFpbnQ6IHtcblx0XHRcdFx0XHRjb25zdHJhaW50VHlwZTogVHlwZU9mQ29uc3RyYWludC5BTkQsXG5cdFx0XHRcdFx0dGVzdHM6IFtcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0Y29uc3RyYWludFR5cGU6IFR5cGVPZkNvbnN0cmFpbnQuQVRfTEVBU1RfTixcblx0XHRcdFx0XHRcdFx0ZGF0YXR5cGU6ICdpbnRlZ2VyJyxcblx0XHRcdFx0XHRcdFx0b3BlcmFuZDogMjUsXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRjb25zdHJhaW50VHlwZTogVHlwZU9mQ29uc3RyYWludC5BVF9NT1NUX04sXG5cdFx0XHRcdFx0XHRcdGRhdGF0eXBlOiAnaW50ZWdlcicsXG5cdFx0XHRcdFx0XHRcdG9wZXJhbmQ6IDc1LFxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRdLFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRlcnJvcjogVHlwZU9mQ29uc3RyYWludC5BTkQsXG5cdFx0XHRcdGVycm9yczogW1xuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGVycm9yOiBUeXBlT2ZDb25zdHJhaW50LkFUX0xFQVNUX04sXG5cdFx0XHRcdFx0XHRjb25zdHJhaW50OiB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0cmFpbnRUeXBlOiBUeXBlT2ZDb25zdHJhaW50LkFUX0xFQVNUX04sXG5cdFx0XHRcdFx0XHRcdGRhdGF0eXBlOiAnaW50ZWdlcicsXG5cdFx0XHRcdFx0XHRcdG9wZXJhbmQ6IDI1LFxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRdLFxuXHRcdFx0fSxcblx0XHRdLFxuXHR9KVxuXG5cdGNvbnN0IHZhbGlkYXRpb24yOiBWYWxpZGF0aW9uID0ge1xuXHRcdG51bWJlclR5cGU6ICdpbnRlZ2VyJyxcblx0XHRkYXRhdHlwZTogJ2ludGVnZXInLFxuXHRcdHZhbHVlOiAxMDAsXG5cdH1cblxuXHRhc3NlcnRFcXVhbHModmFsaWRhdGUodmFsaWRhdGlvbjIpLCB7XG5cdFx0Li4udmFsaWRhdGlvbjIsXG5cdFx0aXNJbnZhbGlkOiB0cnVlLFxuXHRcdGVycm9yczogW1xuXHRcdFx0e1xuXHRcdFx0XHRjb25zdHJhaW50OiB7XG5cdFx0XHRcdFx0Y29uc3RyYWludFR5cGU6IFR5cGVPZkNvbnN0cmFpbnQuQU5ELFxuXHRcdFx0XHRcdHRlc3RzOiBbXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGNvbnN0cmFpbnRUeXBlOiBUeXBlT2ZDb25zdHJhaW50LkFUX0xFQVNUX04sXG5cdFx0XHRcdFx0XHRcdGRhdGF0eXBlOiAnaW50ZWdlcicsXG5cdFx0XHRcdFx0XHRcdG9wZXJhbmQ6IDI1LFxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0Y29uc3RyYWludFR5cGU6IFR5cGVPZkNvbnN0cmFpbnQuQVRfTU9TVF9OLFxuXHRcdFx0XHRcdFx0XHRkYXRhdHlwZTogJ2ludGVnZXInLFxuXHRcdFx0XHRcdFx0XHRvcGVyYW5kOiA3NSxcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XSxcblx0XHRcdFx0fSxcblx0XHRcdFx0ZXJyb3I6IFR5cGVPZkNvbnN0cmFpbnQuQU5ELFxuXHRcdFx0XHRlcnJvcnM6IFtcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRlcnJvcjogVHlwZU9mQ29uc3RyYWludC5BVF9NT1NUX04sXG5cdFx0XHRcdFx0XHRjb25zdHJhaW50OiB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0cmFpbnRUeXBlOiBUeXBlT2ZDb25zdHJhaW50LkFUX01PU1RfTixcblx0XHRcdFx0XHRcdFx0ZGF0YXR5cGU6ICdpbnRlZ2VyJyxcblx0XHRcdFx0XHRcdFx0b3BlcmFuZDogNzUsXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdF0sXG5cdFx0XHR9LFxuXHRcdF0sXG5cdH0pXG59KVxuXG5EZW5vLnRlc3QoJ1thbmRdIGZhaWxzIHdoZW4gYm90aCBjb25zdHJhaW50IGNoZWNrcyBmYWlsJywgKCkgPT4ge1xuXHRjb25zdCB2YWxpZGF0b3IgPSBhbmQoe1xuXHRcdGNvbnN0cmFpbnRUeXBlOiBUeXBlT2ZDb25zdHJhaW50LkFORCxcblx0XHR0ZXN0czogW1xuXHRcdFx0e1xuXHRcdFx0XHRjb25zdHJhaW50VHlwZTogVHlwZU9mQ29uc3RyYWludC5BVF9MRUFTVF9OLFxuXHRcdFx0XHRvcGVyYW5kOiA3NSxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGNvbnN0cmFpbnRUeXBlOiBUeXBlT2ZDb25zdHJhaW50LkFUX01PU1RfTixcblx0XHRcdFx0b3BlcmFuZDogMjUsXG5cdFx0XHR9LFxuXHRcdF0sXG5cdH0pXG5cblx0Y29uc3QgdmFsaWRhdGlvbjogVmFsaWRhdGlvbiA9IHtcblx0XHRudW1iZXJUeXBlOiAnaW50ZWdlcicsXG5cdFx0ZGF0YXR5cGU6ICdpbnRlZ2VyJyxcblx0XHR2YWx1ZTogNTAsXG5cdH1cblxuXHRhc3NlcnRFcXVhbHModmFsaWRhdG9yKHZhbGlkYXRpb24pLCB7XG5cdFx0Li4udmFsaWRhdGlvbixcblx0XHRpc0ludmFsaWQ6IHRydWUsXG5cdFx0ZXJyb3JzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdGNvbnN0cmFpbnQ6IHtcblx0XHRcdFx0XHRjb25zdHJhaW50VHlwZTogVHlwZU9mQ29uc3RyYWludC5BTkQsXG5cdFx0XHRcdFx0dGVzdHM6IFtcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0Y29uc3RyYWludFR5cGU6IFR5cGVPZkNvbnN0cmFpbnQuQVRfTEVBU1RfTixcblx0XHRcdFx0XHRcdFx0ZGF0YXR5cGU6ICdpbnRlZ2VyJyxcblx0XHRcdFx0XHRcdFx0b3BlcmFuZDogNzUsXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRjb25zdHJhaW50VHlwZTogVHlwZU9mQ29uc3RyYWludC5BVF9NT1NUX04sXG5cdFx0XHRcdFx0XHRcdGRhdGF0eXBlOiAnaW50ZWdlcicsXG5cdFx0XHRcdFx0XHRcdG9wZXJhbmQ6IDI1LFxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRdLFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRlcnJvcjogVHlwZU9mQ29uc3RyYWludC5BTkQsXG5cdFx0XHRcdGVycm9yczogW1xuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGVycm9yOiBUeXBlT2ZDb25zdHJhaW50LkFUX0xFQVNUX04sXG5cdFx0XHRcdFx0XHRjb25zdHJhaW50OiB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0cmFpbnRUeXBlOiBUeXBlT2ZDb25zdHJhaW50LkFUX0xFQVNUX04sXG5cdFx0XHRcdFx0XHRcdGRhdGF0eXBlOiAnaW50ZWdlcicsXG5cdFx0XHRcdFx0XHRcdG9wZXJhbmQ6IDc1LFxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGVycm9yOiBUeXBlT2ZDb25zdHJhaW50LkFUX01PU1RfTixcblx0XHRcdFx0XHRcdGNvbnN0cmFpbnQ6IHtcblx0XHRcdFx0XHRcdFx0Y29uc3RyYWludFR5cGU6IFR5cGVPZkNvbnN0cmFpbnQuQVRfTU9TVF9OLFxuXHRcdFx0XHRcdFx0XHRkYXRhdHlwZTogJ2ludGVnZXInLFxuXHRcdFx0XHRcdFx0XHRvcGVyYW5kOiAyNSxcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XSxcblx0XHRcdH0sXG5cdFx0XSxcblx0fSlcbn0pXG4iXX0=