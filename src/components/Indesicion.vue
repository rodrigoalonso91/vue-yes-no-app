<template>
  <img v-if="img" :src="img" alt="bg">
  <div class="bg-dark"></div>
  <div class="indecision-container">
      <input  v-model="question" type="text" placeholder="Hazme una pregunta">
      <p>Recuerda terminar la pregunta con un signo de interrogación (?)</p>

      <div v-if="isValidQuestion">
          <h2> {{question}} </h2>
          <p> {{answer}} </p>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            question:'',
            answer: null,
            img: null,
            isValidQuestion: false
        }
    },
    watch:{
        question(value, oldValue){
            this.isValidQuestion = false
            if (!value.includes('?')) return;
            this.isValidQuestion = true
            this.getAnswer()
        }
    },
    methods:{
        async getAnswer(){
            this.answer = 'Pensando...'
            const {answer, image} = await fetch('https://yesno.wtf/api')
                .then( resp => resp.json() )
                
            this.img = image
            this.answer = translateAnswer(answer)
            
        }
    }
}

const translateAnswer = (answer) =>{
    if (answer === 'yes') return 'Si'
    else if(answer === 'no') return 'No'
    else return 'mmm... Quizas'
}

</script>

<style scoped>
    img, .bg-dark {
        height: 100vh;
        left: 0px;
        max-height: 100%;
        max-width: 100%;
        position: fixed;
        top: 0px;
        width: 100vw;
    }

    .bg-dark {
        background-color: rgba(0, 0, 0, 0.4);
    }

    .indecision-container {
        position: relative;
        z-index: 99;
    }
    
    input {
        width: 250px;
        padding: 10px 15px;
        border-radius: 5px;
        border: none;
        margin-bottom: 1rem;
    }
    input:focus {
        outline: none;
    }

    p {
        color: white;
        font-size: 15px;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        margin-top: 0px;
    }

    h1, h2 {
        color: white;
    }
    
    h2 {
        margin-top: 150px;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    }
</style>