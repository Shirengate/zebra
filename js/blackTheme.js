document.addEventListener('DOMContentLoaded',function(){
    const logo = $(".logo path");
    $.each(logo, function (indexInArray, valueOfElement) { 
        if($(this).attr('fill')=='white'){
            $(this).attr('fill','black')
        }else{
            $(this).attr('fill','white')
        }
    });
    const p = $('.parthnersLogoBox > svg')
    const partners = $('.parthnersLogoBox > svg path')
    $.each(partners, function (indexInArray, valueOfElement) { 
        $(this).attr('fill','white')
    });
    $.each(p, function (indexInArray, valueOfElement) { 
        $(this).attr('fill','white')
    });
})