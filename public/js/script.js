var clickMe = () => {
    alert("Thanks for clicking me. Hope you have a nice day!")
}
const submitForm = () => {
    let formData = {};
    formData.title = $('#first_name').val();
    formData.colour = $('#last_name').val();
    formData.link = $('#password').val();
    formData.description = $('#email').val();
    console.log("Form Data Submitted: ", formData);

    fetch("/api/postcards", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    }).then(response => {
        return response.text
    }).then(result => {
        alert("Results posted!");
        console.log(result);
    }).catch(err => {
        alert("Results failed to post!");
        console.log(err);
    })
}


// const cardList = [
//     {
//         title: "Kitten 2",
//         image:
//             "images/kitten.jpg", link:
//             "About Kitten 2",
//         desciption: "Demo desciption about kitten 2"
//     },
//     {
//         title: "Kitten 3",
//         image:
//             "images/kitten.jpg", link:
//             "About Kitten 3",
//         desciption: "Demo desciption about kitten 3"
//     }
// ]

const getCards = () => {
    $.get('/api/cards', (response) => {
        // if (response.statusCode == 200) {
        //     console.log(response.data);
        //     return response.data
        // }
        console.log("This is the response data" + JSON.stringify(response.data))
    })
}

const addCards =
    (items) => {
        items.forEach(
            item => {
                let itemToAppend = '<div class="col s4 center-align">' +
                    '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="' + item.image + '">' +
                    '</div><div class="card-content">' +
                    '<span class="card-title activator grey-text text-darken-4">' + item.title + '<i class="material-icons right">more_vert</i></span><p><a href="#">' + item.link + '</a></p></div>' + '<div class="card-reveal">' +
                    '<span class="card-title grey-text text-darken-4">' + item.title + '<i class="material-icons right"> close</i></span> ' + ' < p class="card-text" > ' + item.desciption + '</p > ' +
                    '</div></div></div>';
                $("#card-section").append(itemToAppend)
            });
    };


$(document).ready(async function () {
    $('.materialboxed').materialbox();
    getCards();
    // try {
    //     const cards = await getCards();
    //     console.log(cards);
    //     addCards(cards);
    //   } catch (error) {
    //     console.error(error);
    //   }
    $('#modal1').modal();
    $('#clickMeButton').click(function () {
        $('#modal1').modal('open');
    })
    $('#formSubmit').click(() => {
        submitForm();
    })
    $('#modal1').modal();
});
// var cards;

// function waitForDOMReady() {
//     return new Promise(function (resolve) {
//         $(document).ready(function () {
//             resolve();
//         });
//     });
// }

// async function main() {
//     await waitForDOMReady();
//     cards = getCards();
//     console.log(cards);
//     $('.materialboxed').materialbox();
//     $('#modal1').modal();
//     $('#clickMeButton').click(function () {
//         $('#modal1').modal('open');
//     })
//     $('#formSubmit').click(() => {
//         submitForm();
//     })
//     $('#modal1').modal();
// }

// main();