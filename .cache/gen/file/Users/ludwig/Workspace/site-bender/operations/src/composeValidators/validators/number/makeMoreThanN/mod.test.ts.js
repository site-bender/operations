import moreThanN from './mod.ts';
import { TypeOfConstraint } from '../../../../types/enums.ts';
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts';
const constraint = {
    constraintType: TypeOfConstraint.MORE_THAN_N,
    operand: 42,
};
Deno.test('[moreThanN] returns correct validation if integer more than constraint value', () => {
    const validation = {
        datatype: 'integer',
        value: 43,
    };
    assertEquals(moreThanN(constraint)(validation), validation);
});
Deno.test('[moreThanN] returns error if integer less than constraint value', () => {
    const validation = {
        datatype: 'integer',
        value: 41,
    };
    assertEquals(moreThanN(constraint)(validation), {
        ...validation,
        errors: [
            {
                constraint,
                error: TypeOfConstraint.MORE_THAN_N,
            },
        ],
        isInvalid: true,
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb2QudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsTUFBTSxVQUFVLENBQUE7QUFLaEMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNEJBQTRCLENBQUE7QUFDN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtEQUFrRCxDQUFBO0FBRS9FLE1BQU0sVUFBVSxHQUF3QjtJQUN2QyxjQUFjLEVBQUUsZ0JBQWdCLENBQUMsV0FBVztJQUM1QyxPQUFPLEVBQUUsRUFBRTtDQUNYLENBQUE7QUFFRCxJQUFJLENBQUMsSUFBSSxDQUNSLDhFQUE4RSxFQUM5RSxHQUFHLEVBQUU7SUFDSixNQUFNLFVBQVUsR0FBZTtRQUM5QixRQUFRLEVBQUUsU0FBUztRQUNuQixLQUFLLEVBQUUsRUFBRTtLQUNULENBQUE7SUFFRCxZQUFZLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFBO0FBQzVELENBQUMsQ0FDRCxDQUFBO0FBRUQsSUFBSSxDQUFDLElBQUksQ0FDUixpRUFBaUUsRUFDakUsR0FBRyxFQUFFO0lBQ0osTUFBTSxVQUFVLEdBQWU7UUFDOUIsUUFBUSxFQUFFLFNBQVM7UUFDbkIsS0FBSyxFQUFFLEVBQUU7S0FDVCxDQUFBO0lBRUQsWUFBWSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUMvQyxHQUFHLFVBQVU7UUFDYixNQUFNLEVBQUU7WUFDUDtnQkFDQyxVQUFVO2dCQUNWLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXO2FBQ25DO1NBQ0Q7UUFDRCxTQUFTLEVBQUUsSUFBSTtLQUNmLENBQUMsQ0FBQTtBQUNILENBQUMsQ0FDRCxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vcmVUaGFuTiBmcm9tICcuL21vZC50cydcbmltcG9ydCB7XG5cdE1vcmVUaGFuTkNvbnN0cmFpbnQsXG5cdFZhbGlkYXRpb24sXG59IGZyb20gJy4uLy4uLy4uLy4uL3R5cGVzL2NvbnN0cmFpbnRzLnRzJ1xuaW1wb3J0IHsgVHlwZU9mQ29uc3RyYWludCB9IGZyb20gJy4uLy4uLy4uLy4uL3R5cGVzL2VudW1zLnRzJ1xuaW1wb3J0IHsgYXNzZXJ0RXF1YWxzIH0gZnJvbSAnaHR0cHM6Ly9kZW5vLmxhbmQvc3RkQDAuMTE4LjAvdGVzdGluZy9hc3NlcnRzLnRzJ1xuXG5jb25zdCBjb25zdHJhaW50OiBNb3JlVGhhbk5Db25zdHJhaW50ID0ge1xuXHRjb25zdHJhaW50VHlwZTogVHlwZU9mQ29uc3RyYWludC5NT1JFX1RIQU5fTixcblx0b3BlcmFuZDogNDIsXG59XG5cbkRlbm8udGVzdChcblx0J1ttb3JlVGhhbk5dIHJldHVybnMgY29ycmVjdCB2YWxpZGF0aW9uIGlmIGludGVnZXIgbW9yZSB0aGFuIGNvbnN0cmFpbnQgdmFsdWUnLFxuXHQoKSA9PiB7XG5cdFx0Y29uc3QgdmFsaWRhdGlvbjogVmFsaWRhdGlvbiA9IHtcblx0XHRcdGRhdGF0eXBlOiAnaW50ZWdlcicsXG5cdFx0XHR2YWx1ZTogNDMsXG5cdFx0fVxuXG5cdFx0YXNzZXJ0RXF1YWxzKG1vcmVUaGFuTihjb25zdHJhaW50KSh2YWxpZGF0aW9uKSwgdmFsaWRhdGlvbilcblx0fSxcbilcblxuRGVuby50ZXN0KFxuXHQnW21vcmVUaGFuTl0gcmV0dXJucyBlcnJvciBpZiBpbnRlZ2VyIGxlc3MgdGhhbiBjb25zdHJhaW50IHZhbHVlJyxcblx0KCkgPT4ge1xuXHRcdGNvbnN0IHZhbGlkYXRpb246IFZhbGlkYXRpb24gPSB7XG5cdFx0XHRkYXRhdHlwZTogJ2ludGVnZXInLFxuXHRcdFx0dmFsdWU6IDQxLFxuXHRcdH1cblxuXHRcdGFzc2VydEVxdWFscyhtb3JlVGhhbk4oY29uc3RyYWludCkodmFsaWRhdGlvbiksIHtcblx0XHRcdC4uLnZhbGlkYXRpb24sXG5cdFx0XHRlcnJvcnM6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNvbnN0cmFpbnQsXG5cdFx0XHRcdFx0ZXJyb3I6IFR5cGVPZkNvbnN0cmFpbnQuTU9SRV9USEFOX04sXG5cdFx0XHRcdH0sXG5cdFx0XHRdLFxuXHRcdFx0aXNJbnZhbGlkOiB0cnVlLFxuXHRcdH0pXG5cdH0sXG4pXG4iXX0=