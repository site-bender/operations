import matches from './mod.ts';
import { TypeOfConstraint } from '../../../../types/enums.ts';
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts';
const constraint = {
    constraintType: TypeOfConstraint.MATCHING,
    operand: '^\\d+$',
};
Deno.test('[matches] returns correct validation when value matches constraint regexp', () => {
    const validation = {
        datatype: 'string',
        value: '666',
    };
    assertEquals(matches(constraint)(validation), validation);
});
Deno.test('[matches] returns error when value does not match constraint regexp', () => {
    const validation = {
        datatype: 'string',
        value: 'xyz',
    };
    assertEquals(matches(constraint)(validation), {
        ...validation,
        isInvalid: true,
        errors: [
            {
                constraint,
                error: TypeOfConstraint.MATCHING,
            },
        ],
    });
});
Deno.test('[matches] works with flags', () => {
    const validation = {
        datatype: 'string',
        value: 'xyz',
    };
    assertEquals(matches({
        ...constraint,
        operand: '^[A-Z]+$',
        flags: 'i',
    })(validation), validation);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb2QudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLE9BQU8sTUFBTSxVQUFVLENBQUE7QUFLOUIsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNEJBQTRCLENBQUE7QUFDN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtEQUFrRCxDQUFBO0FBRS9FLE1BQU0sVUFBVSxHQUFvQjtJQUNuQyxjQUFjLEVBQUUsZ0JBQWdCLENBQUMsUUFBUTtJQUN6QyxPQUFPLEVBQUUsUUFBUTtDQUNqQixDQUFBO0FBRUQsSUFBSSxDQUFDLElBQUksQ0FDUiwyRUFBMkUsRUFDM0UsR0FBRyxFQUFFO0lBQ0osTUFBTSxVQUFVLEdBQWU7UUFDOUIsUUFBUSxFQUFFLFFBQVE7UUFDbEIsS0FBSyxFQUFFLEtBQUs7S0FDWixDQUFBO0lBRUQsWUFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQTtBQUMxRCxDQUFDLENBQ0QsQ0FBQTtBQUVELElBQUksQ0FBQyxJQUFJLENBQ1IscUVBQXFFLEVBQ3JFLEdBQUcsRUFBRTtJQUNKLE1BQU0sVUFBVSxHQUFlO1FBQzlCLFFBQVEsRUFBRSxRQUFRO1FBQ2xCLEtBQUssRUFBRSxLQUFLO0tBQ1osQ0FBQTtJQUVELFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDN0MsR0FBRyxVQUFVO1FBQ2IsU0FBUyxFQUFFLElBQUk7UUFDZixNQUFNLEVBQUU7WUFDUDtnQkFDQyxVQUFVO2dCQUNWLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxRQUFRO2FBQ2hDO1NBQ0Q7S0FDRCxDQUFDLENBQUE7QUFDSCxDQUFDLENBQ0QsQ0FBQTtBQUVELElBQUksQ0FBQyxJQUFJLENBQUMsNEJBQTRCLEVBQUUsR0FBRyxFQUFFO0lBQzVDLE1BQU0sVUFBVSxHQUFlO1FBQzlCLFFBQVEsRUFBRSxRQUFRO1FBQ2xCLEtBQUssRUFBRSxLQUFLO0tBQ1osQ0FBQTtJQUVELFlBQVksQ0FDWCxPQUFPLENBQUM7UUFDUCxHQUFHLFVBQVU7UUFDYixPQUFPLEVBQUUsVUFBVTtRQUNuQixLQUFLLEVBQUUsR0FBRztLQUNWLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFDZCxVQUFVLENBQ1YsQ0FBQTtBQUNGLENBQUMsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1hdGNoZXMgZnJvbSAnLi9tb2QudHMnXG5pbXBvcnQgdHlwZSB7XG5cdE1hdGNoQ29uc3RyYWludCxcblx0VmFsaWRhdGlvbixcbn0gZnJvbSAnLi4vLi4vLi4vLi4vdHlwZXMvY29uc3RyYWludHMudHMnXG5pbXBvcnQgeyBUeXBlT2ZDb25zdHJhaW50IH0gZnJvbSAnLi4vLi4vLi4vLi4vdHlwZXMvZW51bXMudHMnXG5pbXBvcnQgeyBhc3NlcnRFcXVhbHMgfSBmcm9tICdodHRwczovL2Rlbm8ubGFuZC9zdGRAMC4xMTguMC90ZXN0aW5nL2Fzc2VydHMudHMnXG5cbmNvbnN0IGNvbnN0cmFpbnQ6IE1hdGNoQ29uc3RyYWludCA9IHtcblx0Y29uc3RyYWludFR5cGU6IFR5cGVPZkNvbnN0cmFpbnQuTUFUQ0hJTkcsXG5cdG9wZXJhbmQ6ICdeXFxcXGQrJCcsXG59XG5cbkRlbm8udGVzdChcblx0J1ttYXRjaGVzXSByZXR1cm5zIGNvcnJlY3QgdmFsaWRhdGlvbiB3aGVuIHZhbHVlIG1hdGNoZXMgY29uc3RyYWludCByZWdleHAnLFxuXHQoKSA9PiB7XG5cdFx0Y29uc3QgdmFsaWRhdGlvbjogVmFsaWRhdGlvbiA9IHtcblx0XHRcdGRhdGF0eXBlOiAnc3RyaW5nJyxcblx0XHRcdHZhbHVlOiAnNjY2Jyxcblx0XHR9XG5cblx0XHRhc3NlcnRFcXVhbHMobWF0Y2hlcyhjb25zdHJhaW50KSh2YWxpZGF0aW9uKSwgdmFsaWRhdGlvbilcblx0fSxcbilcblxuRGVuby50ZXN0KFxuXHQnW21hdGNoZXNdIHJldHVybnMgZXJyb3Igd2hlbiB2YWx1ZSBkb2VzIG5vdCBtYXRjaCBjb25zdHJhaW50IHJlZ2V4cCcsXG5cdCgpID0+IHtcblx0XHRjb25zdCB2YWxpZGF0aW9uOiBWYWxpZGF0aW9uID0ge1xuXHRcdFx0ZGF0YXR5cGU6ICdzdHJpbmcnLFxuXHRcdFx0dmFsdWU6ICd4eXonLFxuXHRcdH1cblxuXHRcdGFzc2VydEVxdWFscyhtYXRjaGVzKGNvbnN0cmFpbnQpKHZhbGlkYXRpb24pLCB7XG5cdFx0XHQuLi52YWxpZGF0aW9uLFxuXHRcdFx0aXNJbnZhbGlkOiB0cnVlLFxuXHRcdFx0ZXJyb3JzOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb25zdHJhaW50LFxuXHRcdFx0XHRcdGVycm9yOiBUeXBlT2ZDb25zdHJhaW50Lk1BVENISU5HLFxuXHRcdFx0XHR9LFxuXHRcdFx0XSxcblx0XHR9KVxuXHR9LFxuKVxuXG5EZW5vLnRlc3QoJ1ttYXRjaGVzXSB3b3JrcyB3aXRoIGZsYWdzJywgKCkgPT4ge1xuXHRjb25zdCB2YWxpZGF0aW9uOiBWYWxpZGF0aW9uID0ge1xuXHRcdGRhdGF0eXBlOiAnc3RyaW5nJyxcblx0XHR2YWx1ZTogJ3h5eicsXG5cdH1cblxuXHRhc3NlcnRFcXVhbHMoXG5cdFx0bWF0Y2hlcyh7XG5cdFx0XHQuLi5jb25zdHJhaW50LFxuXHRcdFx0b3BlcmFuZDogJ15bQS1aXSskJyxcblx0XHRcdGZsYWdzOiAnaScsXG5cdFx0fSkodmFsaWRhdGlvbiksXG5cdFx0dmFsaWRhdGlvbixcblx0KVxufSlcbiJdfQ==