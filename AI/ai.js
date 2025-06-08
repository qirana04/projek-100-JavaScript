function startQnA() {
    Swal.fire({
        title: "Halo, siapa namamu?",
        input: 'text',
        inputPlaceholder: 'Masukkan nama Anda',
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            let name = result.value;
            Swal.fire({
                title: `Hai ${name}, ada yang bisa saya bantu?`,
                showCancelButton: true,
                confirmButtonText: 'Beri saya beberapa saran',
                cancelButtonText: 'Bicaralah padaku'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: 'Jadi, apa yang Anda butuhkan sarannya?',
                        showCancelButton: true,
                        confirmButtonText: 'Tentang perasaan',
                        cancelButtonText: 'Tentang kehidupan'
                    }).then((result) => {
                        Swal.fire({
                            title: 'Apakah kamu lelah?',
                            input: 'text',
                            inputPlaceholder: 'Masukkan jawaban Anda',
                            showCancelButton: true,
                            confirmButtonText: 'OK',
                            cancelButtonText: 'Cancel'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                Swal.fire({
                                    title: 'Saya minta maaf tentang hal itu :(',
                                    input: 'text',
                                    inputPlaceholder: 'Masukkan jawaban Anda',
                                    showCancelButton: true,
                                    confirmButtonText: 'OK',
                                    cancelButtonText: 'Cancel'
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        giveAdvice();
                                    }
                                });
                            }
                        });
                    });
                } else {
                    Swal.fire({
                        title: 'Apa yang ingin Anda bicarakan?',
                        input: 'text',
                        inputPlaceholder: 'Masukkan topik Anda di sini',
                        showCancelButton: true,
                        confirmButtonText: 'OK',
                        cancelButtonText: 'Cancel'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            Swal.fire('Great! Let\'s talk about it.');
                        }
                    });
                }
            });
        }
    });
}

function giveAdvice() {
    let advices = [
        "Aku tahu kamu lelah, belajarlah untuk beristirahat dan jangan menyerah.",
        "Makan sehat, berolahraga, dan tidur yang cukup.",
        "Luangkan waktu untuk bersantai, menonton film, membaca buku, atau melakukan sesuatu yang Anda sukai.",
        "Cobalah untuk belajar dan mengembangkan diri setiap hari.",
        "Ingatlah bahwa setiap orang memiliki perjalanan hidupnya sendiri, jangan bandingkan dirimu dengan orang lain.",
        "Dan hal terakhir yang Anda inginkan adalah menjadi unik."
    ];

    (function showAdvice(index) {
        if (index < advices.length) {
            Swal.fire({
                title: advices[index],
                showCancelButton: false,
                confirmButtonText: 'OK',
            }).then((result) => {
                if (result.isConfirmed) {
                    showAdvice(index + 1);
                }
            });
        } else {
            Swal.fire('Jaga kesehatan dan tetaplah sehat!');
        }
    })(0);
}