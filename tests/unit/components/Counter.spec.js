import {shallowMount} from '@vue/test-utils'
import Counter from '@/components/Counter'

describe('Counter component', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(Counter)
    })

    test('Debe hacer match con el snapshot', () => {

        expect( wrapper.html() ).toMatchSnapshot();
    })

    test('h2 debe tener el valor por defecto Counter', () =>{

        expect( wrapper.find('h2').exists() ).toBeTruthy()

        const h2Value = wrapper.find('h2').text()
        expect(h2Value).toBe('Counter')

    })

    test('el valor por defecto del p debe ser 100', () => {

        const pTags = wrapper.find('[data-testid="Counter"]').text()
        expect( pTags ).toBe('100')
    })

    test('El counter debe incrementar y decrementar en 1', async () => {

        const [increaseBtn, decreaseBtn] = wrapper.findAll('button')
        await increaseBtn.trigger('click')
        let counterValue = wrapper.find('[data-testid="Counter"]').text()
        expect(counterValue).toBe('101')

        await decreaseBtn.trigger('click')
        await decreaseBtn.trigger('click')
        counterValue = wrapper.find('[data-testid="Counter"]').text()
        expect(counterValue).toBe('99')
    })

    test('Debe de establecer el valor por defecto', () => {

        const {start} = wrapper.props()
        const value = wrapper.find('[data-testid="Counter"]').text()

        expect(Number(value)).toBe(start)
    })
})  

