const informacaoAnterior = document.querySelector(".calculadora__display__informacao--anterior")
const informacaoAtual = document. querySelector(".calculadora__display__informacao--atual")
const botoes = document.querySelectorAll('.calculadora__botao')


class Calculadora {
    constructor (informacaoAnterior, informacaoAtual) {
        this.informacaoAnterior = informacaoAnterior
        this.informacaoAtual = informacaoAtual
        this.operacaoAtual = ''
    }
    
    // Adiciona digitos no display da calculadora
    addDigito(digito) {
        // Verifica se há algum "." no display
        if(digito == '.' && informacaoAtual.innerText.includes('.')) {
            return
        }

        this.operacaoAtual = digito
        this.atualizarTela()
    }

    // Muda os valors na tela da calculadora 
    atualizarTela(valorDaOperacao = null, operacao = null, atual = null, anterior = null) {
        
        if(valorDaOperacao == null) {
            this.informacaoAtual.innerText += this.operacaoAtual
        }
        else {
            if(anterior === 0) {
                valorDaOperacao = atual
            }

            this.informacaoAnterior.innerText = `${valorDaOperacao} ${operacao}`
            this.informacaoAtual.innerText = ''
        }
    }

    // Processando todas as operações da calculadora
    processaOperacao(operacao) {
        // Chequando se a informação atual está vazio
        if(this.informacaoAtual.innerText === '') {
            // Muda operação
            if(this.informacaoAnterior !== '') {
                this.mudaOperacao(operacao)
            }

            return
        }

        // Obtendo o valor atual e o anterior 
        let valorDaOperacao
        const anterior = Number(informacaoAnterior.innerText.split(' ')[0])
        const atual = Number(informacaoAtual.innerText)

        switch(operacao) {
            case '+':
                valorDaOperacao = anterior + atual
                this.atualizarTela(valorDaOperacao, operacao, atual, anterior)
            case '-':
                valorDaOperacao = anterior - atual
                this.atualizarTela(valorDaOperacao, operacao, atual, anterior)
            case '/':
                valorDaOperacao = anterior / atual
                this.atualizarTela(valorDaOperacao, operacao, atual, anterior)
            case '*':
                valorDaOperacao = anterior * atual
                this.atualizarTela(valorDaOperacao, operacao, atual, anterior)
            case 'DEL':
                this.processaOperadorDel()
            default:
                return
        }
    }

    mudaOperacao(operacao) {
        const operacaoesMatematicas = ['*', '/', '+', '-']

        if(!operacaoesMatematicas.includes(operacao)){
            return
        }

        this.informacaoAnterior.innerText = this.informacaoAnterior.innerText.slice(0, -1) + operacao
    }

    processaOperadorDel() {
        this.operacaoAtual.innerText = this.operacaoAtual.innerText.slice(0, -1)
    }
}

const calculadora = new Calculadora(informacaoAnterior, informacaoAtual)

botoes.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const valor = e.target.innerText
        
        if(+valor >= 0 || valor === '.'){
            calculadora.addDigito(valor)
        }
        else {
            calculadora.processaOperacao(valor)
        }
    })
})
