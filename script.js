// Wrap the whole script inside the DOMContent event
document.addEventListener('DOMContentLoaded' , () => {
   const listItem = document.querySelector(".student-list").children;
   const itemCount = 10;
   const pageDiv = document.querySelector(".page");
   const headerDiv = document.querySelector(".page-header");
   headerDiv.appendChild(createElement('div','className','student-search'))
            .appendChild(createElement('input','placeholder','Search for students...'));
   headerDiv.childNodes[5]
            .appendChild(createElement('button','textContent','Search'));
   const button = document.querySelector("button");         
   const input = document.querySelector("input");


   /*** 
    * Function to display the student list
    * @param {list}   - students data list
    * @param {number} - page to display
   ***/

   function showPage(list,page) {
      const startIndex = (page * itemCount) - itemCount;
      const endIndex = page * itemCount;
      for (let i = 0; i < list.length; i += 1) {
         let li = list[i];
         if (i >= startIndex && i < endIndex) {
            li.style.display = '';
         } else {
               li.style.display = 'none';
         }
      }
   }

   /*** 
    * Function to create pagination dynamically
    * @param {list}   - students data list
   ***/

   function appendPageLinks(list) {
      const div = createElement('div','className','pagination');
      pageDiv.appendChild(div);
      const ul = createElement('ul');
      div.appendChild(ul);
      let noOfPages = Math.ceil((list.length)/itemCount);
      // Creating pages dynamically according to list size
      for (let i = 1; i <= noOfPages; i += 1) {
         const li = createElement('li');
         const a = createElement('a','href','#');
         a.textContent = i;
         if (i === 1) {
            a.className = "active";
         }
         li.appendChild(a);
         ul.appendChild(li);
      }
      //page click event listner
      div.addEventListener('click',(e) => {
         const a = e.target;
         const pageCount = a.textContent;
         const lis = e.target.parentNode.parentNode.children;
         for(let i = 0; i < lis.length; i += 1) {
            lis[i].firstChild.classList.remove("active");
         } 
         a.className = "active";
         showPage(list,pageCount);
      });
   }

   showPage(listItem,1);
   appendPageLinks(listItem);

   /*** 
    * Function to create HTML element
    * @param {string}  - HTML element
    * @param {string}  - HTML element's property
    * @param {string}  - HTML property value
    * @return {string} - HTML element
   ***/

   function createElement(elementName,property,value){
      const element = document.createElement(elementName);
      if(property) {
         element[property] = value;
      }   
      return element
   }

   /*** 
    * Function to search the student name
    * @param {string}  - search input value
   ***/

   function searchName(inputName){
      let searchHit = [];
      const pagination = document. getElementsByClassName("pagination");
      for (let i = 0; i < pagination.length; i += 1) {
         pagination[i].style.display = 'none';
      }
      //loops the entire student list 
      for(let i = 0; i < listItem.length; i += 1){
         const listName = listItem[i].querySelector("h3").textContent.toLowerCase();
         if(inputName.length !==0 && listName.includes(inputName.toLowerCase())) {
            listItem[i].style.display = '';
            searchHit.push(listItem[i]);
         } else if(!listName.includes(inputName.toLowerCase())) {
            listItem[i].style.display = 'none';
         }
      }
      //if there's no student message will be displayed
      if (searchHit.length === 0) {
         pageDiv.innerHTML = "Please enter the correct student name";
      }
      showPage(searchHit,1)
      appendPageLinks(searchHit);
   }

   //Click Event
   button.addEventListener("click", (e) => {
      e.preventDefault();
      const inputName = document.querySelector("input").value;
      input.value = '';
      searchName(inputName);
   });

   //Keyup Event
   button.addEventListener('keyup', () => {
      const inputName = document.querySelector("input").value;
      input.value = '';
      searchName(inputName);
      
   });
});
