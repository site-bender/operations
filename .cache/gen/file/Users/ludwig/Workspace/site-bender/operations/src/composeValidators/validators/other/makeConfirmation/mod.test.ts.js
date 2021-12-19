import confirmed from './mod.ts';
import { TypeOfConstraint } from '../../../../types/enums.ts';
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts';
const constraint = {
    constraintType: TypeOfConstraint.CONFIRMED,
};
Deno.test('[confirmed] returns correct validation when the value is true', () => {
    const validation = {
        datatype: 'boolean',
        value: true,
    };
    assertEquals(confirmed(constraint)(validation), validation);
});
Deno.test('[confirmed] returns error when the value is not true', () => {
    const validation = {
        datatype: 'boolean',
        value: false,
    };
    assertEquals(confirmed(constraint)(validation), {
        ...validation,
        isInvalid: true,
        errors: [
            {
                error: TypeOfConstraint.CONFIRMED,
                constraint,
            },
        ],
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb2QudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsTUFBTSxVQUFVLENBQUE7QUFLaEMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNEJBQTRCLENBQUE7QUFDN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtEQUFrRCxDQUFBO0FBRS9FLE1BQU0sVUFBVSxHQUEyQjtJQUMxQyxjQUFjLEVBQUUsZ0JBQWdCLENBQUMsU0FBUztDQUMxQyxDQUFBO0FBRUQsSUFBSSxDQUFDLElBQUksQ0FDUiwrREFBK0QsRUFDL0QsR0FBRyxFQUFFO0lBQ0osTUFBTSxVQUFVLEdBQWU7UUFDOUIsUUFBUSxFQUFFLFNBQVM7UUFDbkIsS0FBSyxFQUFFLElBQUk7S0FDWCxDQUFBO0lBQ0QsWUFBWSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQTtBQUM1RCxDQUFDLENBQ0QsQ0FBQTtBQUVELElBQUksQ0FBQyxJQUFJLENBQUMsc0RBQXNELEVBQUUsR0FBRyxFQUFFO0lBQ3RFLE1BQU0sVUFBVSxHQUFlO1FBQzlCLFFBQVEsRUFBRSxTQUFTO1FBQ25CLEtBQUssRUFBRSxLQUFLO0tBQ1osQ0FBQTtJQUNELFlBQVksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDL0MsR0FBRyxVQUFVO1FBQ2IsU0FBUyxFQUFFLElBQUk7UUFDZixNQUFNLEVBQUU7WUFDUDtnQkFDQyxLQUFLLEVBQUUsZ0JBQWdCLENBQUMsU0FBUztnQkFDakMsVUFBVTthQUNWO1NBQ0Q7S0FDRCxDQUFDLENBQUE7QUFDSCxDQUFDLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjb25maXJtZWQgZnJvbSAnLi9tb2QudHMnXG5pbXBvcnQgdHlwZSB7XG5cdENvbmZpcm1hdGlvbkNvbnN0cmFpbnQsXG5cdFZhbGlkYXRpb24sXG59IGZyb20gJy4uLy4uLy4uLy4uL3R5cGVzL2NvbnN0cmFpbnRzLnRzJ1xuaW1wb3J0IHsgVHlwZU9mQ29uc3RyYWludCB9IGZyb20gJy4uLy4uLy4uLy4uL3R5cGVzL2VudW1zLnRzJ1xuaW1wb3J0IHsgYXNzZXJ0RXF1YWxzIH0gZnJvbSAnaHR0cHM6Ly9kZW5vLmxhbmQvc3RkQDAuMTE4LjAvdGVzdGluZy9hc3NlcnRzLnRzJ1xuXG5jb25zdCBjb25zdHJhaW50OiBDb25maXJtYXRpb25Db25zdHJhaW50ID0ge1xuXHRjb25zdHJhaW50VHlwZTogVHlwZU9mQ29uc3RyYWludC5DT05GSVJNRUQsXG59XG5cbkRlbm8udGVzdChcblx0J1tjb25maXJtZWRdIHJldHVybnMgY29ycmVjdCB2YWxpZGF0aW9uIHdoZW4gdGhlIHZhbHVlIGlzIHRydWUnLFxuXHQoKSA9PiB7XG5cdFx0Y29uc3QgdmFsaWRhdGlvbjogVmFsaWRhdGlvbiA9IHtcblx0XHRcdGRhdGF0eXBlOiAnYm9vbGVhbicsXG5cdFx0XHR2YWx1ZTogdHJ1ZSxcblx0XHR9XG5cdFx0YXNzZXJ0RXF1YWxzKGNvbmZpcm1lZChjb25zdHJhaW50KSh2YWxpZGF0aW9uKSwgdmFsaWRhdGlvbilcblx0fSxcbilcblxuRGVuby50ZXN0KCdbY29uZmlybWVkXSByZXR1cm5zIGVycm9yIHdoZW4gdGhlIHZhbHVlIGlzIG5vdCB0cnVlJywgKCkgPT4ge1xuXHRjb25zdCB2YWxpZGF0aW9uOiBWYWxpZGF0aW9uID0ge1xuXHRcdGRhdGF0eXBlOiAnYm9vbGVhbicsXG5cdFx0dmFsdWU6IGZhbHNlLFxuXHR9XG5cdGFzc2VydEVxdWFscyhjb25maXJtZWQoY29uc3RyYWludCkodmFsaWRhdGlvbiksIHtcblx0XHQuLi52YWxpZGF0aW9uLFxuXHRcdGlzSW52YWxpZDogdHJ1ZSxcblx0XHRlcnJvcnM6IFtcblx0XHRcdHtcblx0XHRcdFx0ZXJyb3I6IFR5cGVPZkNvbnN0cmFpbnQuQ09ORklSTUVELFxuXHRcdFx0XHRjb25zdHJhaW50LFxuXHRcdFx0fSxcblx0XHRdLFxuXHR9KVxufSlcbiJdfQ==