const menuToggle = document.querySelector(".toggle-menu__icon");

const menu = document.querySelector(".nav__menu");
menuToggle.addEventListener("click", function (e) {
    menu.classList.toggle("transform-100");
});

document.addEventListener("click", function (event) {
    if (
        !menu.contains(event.target) &&
        !event.target.matches(".toggle-menu__icon")
    ) {
        menu.classList.remove("transform-100");
        menuToggle.classList.remove("transform-100");
        menuToggle.classList.add("transform-100");
    }
});

// const buttonOpenModal = document.querySelector(".button-open-modal");
// // const openModal = document.querySelector(".open-modal");

// const template = `<div class="modal">
//   <div class="modal-content">
//     <i class="fa fa-times modal-close"></i>
//   </div>
// </div>`;

// menuToggle.addEventListener("click", function () {
//     menuToggle.insertAdjacentHTML("beforeend", template);
// });

// menuToggle.addEventListener("click", function (event) {
//     if (event.target.matches(".modal-close")) {
//         const modal = event.target.parentNode.parentNode;
//         modal.parentNode.removeChild(modal);
//     } else if (event.target.matches(".modal")) {
//         event.target.parentNode.removeChild(event.target);
//     }
// });

window.addEventListener("load", function () {
    const tabs = document.querySelectorAll(".tab-item");
    const tabsContent = document.querySelectorAll(".tab-content");

    function handleChangeTab(e) {
        const tabId = e.target.dataset.tab;
        tabs.forEach((el) => el.classList.remove("active"));
        e.target.classList.add("active");
        tabsContent.forEach((el) => {
            el.classList.remove("active");
            if (el.getAttribute("data-tab") === tabId) {
                el.classList.add("active");
            }
        });
    }

    tabs.forEach((el) => el.addEventListener("click", handleChangeTab));
});

let thisPage = 1;
let limit = 16;
let list = document.querySelectorAll(".land-list .land-item");
console.log(list.length);
function loadItem() {
    let beginGet = limit * (thisPage - 1);
    let endGet = limit * thisPage - 1;
    list.forEach((item, key) => {
        if (key >= beginGet && key <= endGet) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
    listPage();
}

loadItem();

function listPage() {
    let count = Math.ceil(list.length / limit);
    document.querySelector(".listPage").innerHTML = "";

    console.log(list.length);
    console.log(limit);
    if (thisPage != 1) {
        let prev = document.createElement("li");
        prev.innerText = "PREV";
        prev.setAttribute("onclick", "changePage(" + (thisPage - 1) + ")");
        document.querySelector(".listPage").appendChild(prev);
    }
    console.log(count);
    for (i = 1; i <= count; i++) {
        let newPage = document.createElement("li");
        newPage.innerText = i;
        if (i == thisPage) {
            newPage.classList.add("active");
        }
        newPage.setAttribute("onclick", "changePage(" + i + ")");
        document.querySelector(".listPage").appendChild(newPage);
    }

    if (thisPage != count) {
        let next = document.createElement("li");
        next.innerHTML = "NEXT";
        next.setAttribute("onclick", "changePage(" + (thisPage + 1) + ")");
        document.querySelector(".listPage").appendChild(next);
    }
}

function changePage(i) {
    thisPage = i;
    loadItem();
}
