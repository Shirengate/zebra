document.addEventListener("DOMContentLoaded", function () {
    if(localStorage.getItem('theme') === 'black'){
        document.querySelectorAll('.logo > g > path').forEach(e =>{
            if(e.getAttribute('fill')=='white'){
                e.setAttribute('fill','black')
            }else{
                e.setAttribute('fill','white')
            }
        })
    }else{
        document.querySelectorAll('.logo > g > path').forEach(e =>{
            if(e.getAttribute('fill')=='white'){
                e.setAttribute('fill','white')
            }else{
                e.setAttribute('fill','black')
            }
        })
    }
});
