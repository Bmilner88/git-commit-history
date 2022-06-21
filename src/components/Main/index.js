import React from 'react';

let test;

fetch(`https://api.github.com/repos/bmilner88/git-commit-history/commits`)
        .then(response => {
            if(response.ok) {
                response.json().then(data => {
                    test = data[0].commit.message
                    console.log(data[0].commit.message)
                })
            }
        })

export default function Main() {
    return(
        <div>{`${test}`}</div>
    );
};