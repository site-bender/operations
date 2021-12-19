import makeIsSet from './mod.ts';
import { TypeOfConstraint } from '../../../../types/enums.ts';
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts';
const constraint = {
    constraintType: TypeOfConstraint.IS_SET,
};
Deno.test('[makeIsSet] returns correct validation when value is a set', () => {
    const stringValidation = {
        datatype: 'set',
        value: 'red,green,blue',
    };
    assertEquals(makeIsSet(constraint)(stringValidation), stringValidation);
    const arrayValidation = {
        datatype: 'set',
        value: [1, 4, 9, 16, 25],
    };
    assertEquals(makeIsSet(constraint)(arrayValidation), arrayValidation);
    const setValidation = {
        datatype: 'set',
        value: new Set([3.3, 4.4, 5.5]),
    };
    assertEquals(makeIsSet(constraint)(setValidation), setValidation);
});
Deno.test('[makeIsSet] returns error when value is not a set', () => {
    const validation = {
        datatype: 'set',
        value: 666,
    };
    assertEquals(makeIsSet(constraint)(validation), {
        ...validation,
        isInvalid: true,
        errors: [
            {
                error: TypeOfConstraint.IS_SET,
                constraint,
                errorMessage: "Cannot use 'in' operator to search for 'size' in 666",
            },
        ],
    });
    const unsetValidation = {
        datatype: 'set',
        value: 'red,green,blue,red,green',
    };
    assertEquals(makeIsSet(constraint)(unsetValidation), {
        ...unsetValidation,
        isInvalid: true,
        errors: [
            {
                error: TypeOfConstraint.IS_SET,
                constraint,
            },
        ],
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb2QudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsTUFBTSxVQUFVLENBQUE7QUFLaEMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNEJBQTRCLENBQUE7QUFFN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtEQUFrRCxDQUFBO0FBRS9FLE1BQU0sVUFBVSxHQUFzQjtJQUNyQyxjQUFjLEVBQUUsZ0JBQWdCLENBQUMsTUFBTTtDQUN2QyxDQUFBO0FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyw0REFBNEQsRUFBRSxHQUFHLEVBQUU7SUFDNUUsTUFBTSxnQkFBZ0IsR0FBZTtRQUNwQyxRQUFRLEVBQUUsS0FBSztRQUNmLEtBQUssRUFBRSxnQkFBZ0I7S0FDdkIsQ0FBQTtJQUVELFlBQVksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFBO0lBRXZFLE1BQU0sZUFBZSxHQUFlO1FBQ25DLFFBQVEsRUFBRSxLQUFLO1FBQ2YsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztLQUN4QixDQUFBO0lBRUQsWUFBWSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxlQUFlLENBQUMsRUFBRSxlQUFlLENBQUMsQ0FBQTtJQUVyRSxNQUFNLGFBQWEsR0FBZTtRQUNqQyxRQUFRLEVBQUUsS0FBSztRQUNmLEtBQUssRUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7S0FDL0IsQ0FBQTtJQUVELFlBQVksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsYUFBYSxDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUE7QUFDbEUsQ0FBQyxDQUFDLENBQUE7QUFFRixJQUFJLENBQUMsSUFBSSxDQUFDLG1EQUFtRCxFQUFFLEdBQUcsRUFBRTtJQUNuRSxNQUFNLFVBQVUsR0FBMEI7UUFDekMsUUFBUSxFQUFFLEtBQUs7UUFFZixLQUFLLEVBQUUsR0FBRztLQUNWLENBQUE7SUFFRCxZQUFZLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQy9DLEdBQUcsVUFBVTtRQUNiLFNBQVMsRUFBRSxJQUFJO1FBQ2YsTUFBTSxFQUFFO1lBQ1A7Z0JBQ0MsS0FBSyxFQUFFLGdCQUFnQixDQUFDLE1BQU07Z0JBQzlCLFVBQVU7Z0JBQ1YsWUFBWSxFQUFFLHNEQUFzRDthQUNwRTtTQUNEO0tBQ0QsQ0FBQyxDQUFBO0lBRUYsTUFBTSxlQUFlLEdBQWU7UUFDbkMsUUFBUSxFQUFFLEtBQUs7UUFDZixLQUFLLEVBQUUsMEJBQTBCO0tBQ2pDLENBQUE7SUFFRCxZQUFZLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxFQUFFO1FBQ3BELEdBQUcsZUFBZTtRQUNsQixTQUFTLEVBQUUsSUFBSTtRQUNmLE1BQU0sRUFBRTtZQUNQO2dCQUNDLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxNQUFNO2dCQUM5QixVQUFVO2FBQ1Y7U0FDRDtLQUNELENBQUMsQ0FBQTtBQUNILENBQUMsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1ha2VJc1NldCBmcm9tICcuL21vZC50cydcbmltcG9ydCB0eXBlIHtcblx0U2V0VHlwZUNvbnN0cmFpbnQsXG5cdFZhbGlkYXRpb24sXG59IGZyb20gJy4uLy4uLy4uLy4uL3R5cGVzL2NvbnN0cmFpbnRzLnRzJ1xuaW1wb3J0IHsgVHlwZU9mQ29uc3RyYWludCB9IGZyb20gJy4uLy4uLy4uLy4uL3R5cGVzL2VudW1zLnRzJ1xuaW1wb3J0IHR5cGUgeyBTZXRWYWx1ZSB9IGZyb20gJy4uLy4uLy4uLy4uL3R5cGVzL3ZhbHVlcy50cydcbmltcG9ydCB7IGFzc2VydEVxdWFscyB9IGZyb20gJ2h0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjExOC4wL3Rlc3RpbmcvYXNzZXJ0cy50cydcblxuY29uc3QgY29uc3RyYWludDogU2V0VHlwZUNvbnN0cmFpbnQgPSB7XG5cdGNvbnN0cmFpbnRUeXBlOiBUeXBlT2ZDb25zdHJhaW50LklTX1NFVCxcbn1cblxuRGVuby50ZXN0KCdbbWFrZUlzU2V0XSByZXR1cm5zIGNvcnJlY3QgdmFsaWRhdGlvbiB3aGVuIHZhbHVlIGlzIGEgc2V0JywgKCkgPT4ge1xuXHRjb25zdCBzdHJpbmdWYWxpZGF0aW9uOiBWYWxpZGF0aW9uID0ge1xuXHRcdGRhdGF0eXBlOiAnc2V0Jyxcblx0XHR2YWx1ZTogJ3JlZCxncmVlbixibHVlJyxcblx0fVxuXG5cdGFzc2VydEVxdWFscyhtYWtlSXNTZXQoY29uc3RyYWludCkoc3RyaW5nVmFsaWRhdGlvbiksIHN0cmluZ1ZhbGlkYXRpb24pXG5cblx0Y29uc3QgYXJyYXlWYWxpZGF0aW9uOiBWYWxpZGF0aW9uID0ge1xuXHRcdGRhdGF0eXBlOiAnc2V0Jyxcblx0XHR2YWx1ZTogWzEsIDQsIDksIDE2LCAyNV0sXG5cdH1cblxuXHRhc3NlcnRFcXVhbHMobWFrZUlzU2V0KGNvbnN0cmFpbnQpKGFycmF5VmFsaWRhdGlvbiksIGFycmF5VmFsaWRhdGlvbilcblxuXHRjb25zdCBzZXRWYWxpZGF0aW9uOiBWYWxpZGF0aW9uID0ge1xuXHRcdGRhdGF0eXBlOiAnc2V0Jyxcblx0XHR2YWx1ZTogbmV3IFNldChbMy4zLCA0LjQsIDUuNV0pLFxuXHR9XG5cblx0YXNzZXJ0RXF1YWxzKG1ha2VJc1NldChjb25zdHJhaW50KShzZXRWYWxpZGF0aW9uKSwgc2V0VmFsaWRhdGlvbilcbn0pXG5cbkRlbm8udGVzdCgnW21ha2VJc1NldF0gcmV0dXJucyBlcnJvciB3aGVuIHZhbHVlIGlzIG5vdCBhIHNldCcsICgpID0+IHtcblx0Y29uc3QgdmFsaWRhdGlvbjogVmFsaWRhdGlvbiAmIFNldFZhbHVlID0ge1xuXHRcdGRhdGF0eXBlOiAnc2V0Jyxcblx0XHQvLyBAdHMtaWdub3JlOiBmb3IgdGVzdGluZyBwdXJwb3Nlc1xuXHRcdHZhbHVlOiA2NjYsXG5cdH1cblxuXHRhc3NlcnRFcXVhbHMobWFrZUlzU2V0KGNvbnN0cmFpbnQpKHZhbGlkYXRpb24pLCB7XG5cdFx0Li4udmFsaWRhdGlvbixcblx0XHRpc0ludmFsaWQ6IHRydWUsXG5cdFx0ZXJyb3JzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdGVycm9yOiBUeXBlT2ZDb25zdHJhaW50LklTX1NFVCxcblx0XHRcdFx0Y29uc3RyYWludCxcblx0XHRcdFx0ZXJyb3JNZXNzYWdlOiBcIkNhbm5vdCB1c2UgJ2luJyBvcGVyYXRvciB0byBzZWFyY2ggZm9yICdzaXplJyBpbiA2NjZcIixcblx0XHRcdH0sXG5cdFx0XSxcblx0fSlcblxuXHRjb25zdCB1bnNldFZhbGlkYXRpb246IFZhbGlkYXRpb24gPSB7XG5cdFx0ZGF0YXR5cGU6ICdzZXQnLFxuXHRcdHZhbHVlOiAncmVkLGdyZWVuLGJsdWUscmVkLGdyZWVuJyxcblx0fVxuXG5cdGFzc2VydEVxdWFscyhtYWtlSXNTZXQoY29uc3RyYWludCkodW5zZXRWYWxpZGF0aW9uKSwge1xuXHRcdC4uLnVuc2V0VmFsaWRhdGlvbixcblx0XHRpc0ludmFsaWQ6IHRydWUsXG5cdFx0ZXJyb3JzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdGVycm9yOiBUeXBlT2ZDb25zdHJhaW50LklTX1NFVCxcblx0XHRcdFx0Y29uc3RyYWludCxcblx0XHRcdH0sXG5cdFx0XSxcblx0fSlcbn0pXG4iXX0=