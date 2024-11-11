const miPromesa = new Promise((resolve, reject) => {
    setTimeout(() => {
        const calif = Math.ceil(Math.random() * 10); //.Math.ceil redondea al numero mas grande aproximado
        if (calif >= 8)
            return resolve('Si pasass');
        else
            return reject('no pasa');
    }, 3000);
});

miPromesa
        .then(result => console.log(result))
        .catch(error => console.log(error));