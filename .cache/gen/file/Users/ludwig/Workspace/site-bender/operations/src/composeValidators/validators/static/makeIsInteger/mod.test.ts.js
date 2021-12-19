import makeIsInteger from './mod.ts';
import { TypeOfConstraint } from '../../../../types/enums.ts';
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts';
const constraint = {
    constraintType: TypeOfConstraint.IS_INTEGER,
};
Deno.test('[makeIsInteger] returns correct validation when value is an integer', () => {
    const validation = {
        datatype: 'integer',
        value: 3,
    };
    assertEquals(makeIsInteger(constraint)(validation), validation);
});
Deno.test('[makeIsInteger] returns error when value is not an integer', () => {
    const validation = {
        datatype: 'integer',
        value: 3.1415,
    };
    assertEquals(makeIsInteger(constraint)(validation), {
        ...validation,
        isInvalid: true,
        errors: [
            {
                error: TypeOfConstraint.IS_INTEGER,
                constraint,
            },
        ],
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb2QudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLGFBQWEsTUFBTSxVQUFVLENBQUE7QUFLcEMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNEJBQTRCLENBQUE7QUFDN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtEQUFrRCxDQUFBO0FBRS9FLE1BQU0sVUFBVSxHQUEwQjtJQUN6QyxjQUFjLEVBQUUsZ0JBQWdCLENBQUMsVUFBVTtDQUMzQyxDQUFBO0FBRUQsSUFBSSxDQUFDLElBQUksQ0FDUixxRUFBcUUsRUFDckUsR0FBRyxFQUFFO0lBQ0osTUFBTSxVQUFVLEdBQWU7UUFDOUIsUUFBUSxFQUFFLFNBQVM7UUFDbkIsS0FBSyxFQUFFLENBQUM7S0FDUixDQUFBO0lBRUQsWUFBWSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQTtBQUNoRSxDQUFDLENBQ0QsQ0FBQTtBQUVELElBQUksQ0FBQyxJQUFJLENBQUMsNERBQTRELEVBQUUsR0FBRyxFQUFFO0lBQzVFLE1BQU0sVUFBVSxHQUFlO1FBQzlCLFFBQVEsRUFBRSxTQUFTO1FBQ25CLEtBQUssRUFBRSxNQUFNO0tBQ2IsQ0FBQTtJQUVELFlBQVksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDbkQsR0FBRyxVQUFVO1FBQ2IsU0FBUyxFQUFFLElBQUk7UUFDZixNQUFNLEVBQUU7WUFDUDtnQkFDQyxLQUFLLEVBQUUsZ0JBQWdCLENBQUMsVUFBVTtnQkFDbEMsVUFBVTthQUNWO1NBQ0Q7S0FDRCxDQUFDLENBQUE7QUFDSCxDQUFDLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtYWtlSXNJbnRlZ2VyIGZyb20gJy4vbW9kLnRzJ1xuaW1wb3J0IHtcblx0SW50ZWdlclR5cGVDb25zdHJhaW50LFxuXHRWYWxpZGF0aW9uLFxufSBmcm9tICcuLi8uLi8uLi8uLi90eXBlcy9jb25zdHJhaW50cy50cydcbmltcG9ydCB7IFR5cGVPZkNvbnN0cmFpbnQgfSBmcm9tICcuLi8uLi8uLi8uLi90eXBlcy9lbnVtcy50cydcbmltcG9ydCB7IGFzc2VydEVxdWFscyB9IGZyb20gJ2h0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjExOC4wL3Rlc3RpbmcvYXNzZXJ0cy50cydcblxuY29uc3QgY29uc3RyYWludDogSW50ZWdlclR5cGVDb25zdHJhaW50ID0ge1xuXHRjb25zdHJhaW50VHlwZTogVHlwZU9mQ29uc3RyYWludC5JU19JTlRFR0VSLFxufVxuXG5EZW5vLnRlc3QoXG5cdCdbbWFrZUlzSW50ZWdlcl0gcmV0dXJucyBjb3JyZWN0IHZhbGlkYXRpb24gd2hlbiB2YWx1ZSBpcyBhbiBpbnRlZ2VyJyxcblx0KCkgPT4ge1xuXHRcdGNvbnN0IHZhbGlkYXRpb246IFZhbGlkYXRpb24gPSB7XG5cdFx0XHRkYXRhdHlwZTogJ2ludGVnZXInLFxuXHRcdFx0dmFsdWU6IDMsXG5cdFx0fVxuXG5cdFx0YXNzZXJ0RXF1YWxzKG1ha2VJc0ludGVnZXIoY29uc3RyYWludCkodmFsaWRhdGlvbiksIHZhbGlkYXRpb24pXG5cdH0sXG4pXG5cbkRlbm8udGVzdCgnW21ha2VJc0ludGVnZXJdIHJldHVybnMgZXJyb3Igd2hlbiB2YWx1ZSBpcyBub3QgYW4gaW50ZWdlcicsICgpID0+IHtcblx0Y29uc3QgdmFsaWRhdGlvbjogVmFsaWRhdGlvbiA9IHtcblx0XHRkYXRhdHlwZTogJ2ludGVnZXInLFxuXHRcdHZhbHVlOiAzLjE0MTUsXG5cdH1cblxuXHRhc3NlcnRFcXVhbHMobWFrZUlzSW50ZWdlcihjb25zdHJhaW50KSh2YWxpZGF0aW9uKSwge1xuXHRcdC4uLnZhbGlkYXRpb24sXG5cdFx0aXNJbnZhbGlkOiB0cnVlLFxuXHRcdGVycm9yczogW1xuXHRcdFx0e1xuXHRcdFx0XHRlcnJvcjogVHlwZU9mQ29uc3RyYWludC5JU19JTlRFR0VSLFxuXHRcdFx0XHRjb25zdHJhaW50LFxuXHRcdFx0fSxcblx0XHRdLFxuXHR9KVxufSlcbiJdfQ==