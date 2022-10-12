"use strict"

const postUrl = 'https://ajax.test-danit.com/api/json/posts';
const userUrl = 'https://ajax.test-danit.com/api/json/users';
const pageRoot = document.querySelector("#root");
const cardForm = document.createElement('div');
cardForm.classList.add('page-card');
pageRoot.append(cardForm);

class Card {
    constructor (userUrl, postUrl, pageRoot) {
        this.userUrl = userUrl;
        this.postUrl = postUrl;
        this.pageRoot = pageRoot;
    };
    requestUser() {
        return fetch(this.userUrl)
            .then((request) => {
                return request.json();
            })
            .then((request) => {
                // console.log(request);
            fetch(this.postUrl)
                .then((dataPost) => {
                    return dataPost.json();
                })
                .then((posts) => {
                    // console.log(posts);
                    request.forEach((user) => {
                        const userPost = posts.filter((post) => {
                            if (post.userId === user.id) {
                                return true;
                            };
                        });
                        userPost.forEach((post) => {
                            pageRoot.insertAdjacentHTML('afterbegin',
                                `<div class="page-card" id=${user.id}>
                                        <input  class="cardClose"
                                                type="submit"
                                                value="close"
                                        />
                                        <h1 class="page-title">${post.title}</h1>
                                        <p class="page-text">${post.body}.</p>
                                        <p class="page-userName">User name: ${user.name}</p>
                                        <p class="page-userEmail">email: ${user.email}</p>
                                    </div>`);

                            const cardButton = document.querySelector('.cardClose');
                            cardButton.addEventListener('click',(e) => {
                                fetch('https://ajax.test-danit.com/api/json/posts/${postId}')
                                    .then((del) => {
                                        if (del.ok) {
                                            e.target.closest(".page-card").remove();
                                        };
                                    });
                            });
                        });
                    });
                });
            });
        };
    };

const someCard = new Card(userUrl, postUrl, pageRoot).requestUser();