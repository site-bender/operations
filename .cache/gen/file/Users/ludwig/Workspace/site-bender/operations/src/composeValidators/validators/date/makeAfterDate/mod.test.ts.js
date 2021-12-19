import afterDate from './mod.ts';
import { TypeOfConstraint } from '../../../../types/enums.ts';
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts';
const constraint = {
    constraintType: TypeOfConstraint.AFTER_DATE,
    operand: '2001-01-01',
};
Deno.test('[afterDate] returns correct validation if date after constraint value', () => {
    const validation = {
        datatype: 'plainDate',
        value: '2001-09-11',
    };
    assertEquals(afterDate(constraint)(validation), validation);
});
Deno.test('[afterDate] returns error if date before constraint value', () => {
    const validation = {
        datatype: 'plainDate',
        value: '1999-01-01',
    };
    assertEquals(afterDate(constraint)(validation), {
        ...validation,
        errors: [
            {
                constraint,
                error: TypeOfConstraint.AFTER_DATE,
            },
        ],
        isInvalid: true,
    });
});
Deno.test('[afterDate] returns error if bad date', () => {
    const validation = {
        datatype: 'plainDate',
        value: '2001-09-31',
    };
    assertEquals(afterDate(constraint)(validation), {
        ...validation,
        errors: [
            {
                constraint,
                error: TypeOfConstraint.AFTER_DATE,
                errorMessage: 'RangeError: value out of range: 1 <= 31 <= 30',
            },
        ],
        isInvalid: true,
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb2QudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsTUFBTSxVQUFVLENBQUE7QUFLaEMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNEJBQTRCLENBQUE7QUFDN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtEQUFrRCxDQUFBO0FBRS9FLE1BQU0sVUFBVSxHQUF3QjtJQUN2QyxjQUFjLEVBQUUsZ0JBQWdCLENBQUMsVUFBVTtJQUMzQyxPQUFPLEVBQUUsWUFBWTtDQUNyQixDQUFBO0FBRUQsSUFBSSxDQUFDLElBQUksQ0FDUix1RUFBdUUsRUFDdkUsR0FBRyxFQUFFO0lBQ0osTUFBTSxVQUFVLEdBQWU7UUFDOUIsUUFBUSxFQUFFLFdBQVc7UUFDckIsS0FBSyxFQUFFLFlBQVk7S0FDbkIsQ0FBQTtJQUVELFlBQVksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUE7QUFDNUQsQ0FBQyxDQUNELENBQUE7QUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLDJEQUEyRCxFQUFFLEdBQUcsRUFBRTtJQUMzRSxNQUFNLFVBQVUsR0FBZTtRQUM5QixRQUFRLEVBQUUsV0FBVztRQUNyQixLQUFLLEVBQUUsWUFBWTtLQUNuQixDQUFBO0lBRUQsWUFBWSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUMvQyxHQUFHLFVBQVU7UUFDYixNQUFNLEVBQUU7WUFDUDtnQkFDQyxVQUFVO2dCQUNWLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxVQUFVO2FBQ2xDO1NBQ0Q7UUFDRCxTQUFTLEVBQUUsSUFBSTtLQUNmLENBQUMsQ0FBQTtBQUNILENBQUMsQ0FBQyxDQUFBO0FBRUYsSUFBSSxDQUFDLElBQUksQ0FBQyx1Q0FBdUMsRUFBRSxHQUFHLEVBQUU7SUFDdkQsTUFBTSxVQUFVLEdBQWU7UUFDOUIsUUFBUSxFQUFFLFdBQVc7UUFDckIsS0FBSyxFQUFFLFlBQVk7S0FDbkIsQ0FBQTtJQUVELFlBQVksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDL0MsR0FBRyxVQUFVO1FBQ2IsTUFBTSxFQUFFO1lBQ1A7Z0JBQ0MsVUFBVTtnQkFDVixLQUFLLEVBQUUsZ0JBQWdCLENBQUMsVUFBVTtnQkFDbEMsWUFBWSxFQUFFLCtDQUErQzthQUM3RDtTQUNEO1FBQ0QsU0FBUyxFQUFFLElBQUk7S0FDZixDQUFDLENBQUE7QUFDSCxDQUFDLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhZnRlckRhdGUgZnJvbSAnLi9tb2QudHMnXG5pbXBvcnQge1xuXHRBZnRlckRhdGVDb25zdHJhaW50LFxuXHRWYWxpZGF0aW9uLFxufSBmcm9tICcuLi8uLi8uLi8uLi90eXBlcy9jb25zdHJhaW50cy50cydcbmltcG9ydCB7IFR5cGVPZkNvbnN0cmFpbnQgfSBmcm9tICcuLi8uLi8uLi8uLi90eXBlcy9lbnVtcy50cydcbmltcG9ydCB7IGFzc2VydEVxdWFscyB9IGZyb20gJ2h0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjExOC4wL3Rlc3RpbmcvYXNzZXJ0cy50cydcblxuY29uc3QgY29uc3RyYWludDogQWZ0ZXJEYXRlQ29uc3RyYWludCA9IHtcblx0Y29uc3RyYWludFR5cGU6IFR5cGVPZkNvbnN0cmFpbnQuQUZURVJfREFURSxcblx0b3BlcmFuZDogJzIwMDEtMDEtMDEnLFxufVxuXG5EZW5vLnRlc3QoXG5cdCdbYWZ0ZXJEYXRlXSByZXR1cm5zIGNvcnJlY3QgdmFsaWRhdGlvbiBpZiBkYXRlIGFmdGVyIGNvbnN0cmFpbnQgdmFsdWUnLFxuXHQoKSA9PiB7XG5cdFx0Y29uc3QgdmFsaWRhdGlvbjogVmFsaWRhdGlvbiA9IHtcblx0XHRcdGRhdGF0eXBlOiAncGxhaW5EYXRlJyxcblx0XHRcdHZhbHVlOiAnMjAwMS0wOS0xMScsXG5cdFx0fVxuXG5cdFx0YXNzZXJ0RXF1YWxzKGFmdGVyRGF0ZShjb25zdHJhaW50KSh2YWxpZGF0aW9uKSwgdmFsaWRhdGlvbilcblx0fSxcbilcblxuRGVuby50ZXN0KCdbYWZ0ZXJEYXRlXSByZXR1cm5zIGVycm9yIGlmIGRhdGUgYmVmb3JlIGNvbnN0cmFpbnQgdmFsdWUnLCAoKSA9PiB7XG5cdGNvbnN0IHZhbGlkYXRpb246IFZhbGlkYXRpb24gPSB7XG5cdFx0ZGF0YXR5cGU6ICdwbGFpbkRhdGUnLFxuXHRcdHZhbHVlOiAnMTk5OS0wMS0wMScsXG5cdH1cblxuXHRhc3NlcnRFcXVhbHMoYWZ0ZXJEYXRlKGNvbnN0cmFpbnQpKHZhbGlkYXRpb24pLCB7XG5cdFx0Li4udmFsaWRhdGlvbixcblx0XHRlcnJvcnM6IFtcblx0XHRcdHtcblx0XHRcdFx0Y29uc3RyYWludCxcblx0XHRcdFx0ZXJyb3I6IFR5cGVPZkNvbnN0cmFpbnQuQUZURVJfREFURSxcblx0XHRcdH0sXG5cdFx0XSxcblx0XHRpc0ludmFsaWQ6IHRydWUsXG5cdH0pXG59KVxuXG5EZW5vLnRlc3QoJ1thZnRlckRhdGVdIHJldHVybnMgZXJyb3IgaWYgYmFkIGRhdGUnLCAoKSA9PiB7XG5cdGNvbnN0IHZhbGlkYXRpb246IFZhbGlkYXRpb24gPSB7XG5cdFx0ZGF0YXR5cGU6ICdwbGFpbkRhdGUnLFxuXHRcdHZhbHVlOiAnMjAwMS0wOS0zMScsXG5cdH1cblxuXHRhc3NlcnRFcXVhbHMoYWZ0ZXJEYXRlKGNvbnN0cmFpbnQpKHZhbGlkYXRpb24pLCB7XG5cdFx0Li4udmFsaWRhdGlvbixcblx0XHRlcnJvcnM6IFtcblx0XHRcdHtcblx0XHRcdFx0Y29uc3RyYWludCxcblx0XHRcdFx0ZXJyb3I6IFR5cGVPZkNvbnN0cmFpbnQuQUZURVJfREFURSxcblx0XHRcdFx0ZXJyb3JNZXNzYWdlOiAnUmFuZ2VFcnJvcjogdmFsdWUgb3V0IG9mIHJhbmdlOiAxIDw9IDMxIDw9IDMwJyxcblx0XHRcdH0sXG5cdFx0XSxcblx0XHRpc0ludmFsaWQ6IHRydWUsXG5cdH0pXG59KVxuIl19