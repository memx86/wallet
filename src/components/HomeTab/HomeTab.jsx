// import s from './HomeTab.module.scss'

import NewTable from "components/NewTable";
const arr = [
  {
    id: "d907ac87-21cc-452b-bcde-54ce335dbeb9",
    transactionDate: "2022-05-12",
    type: "INCOME",
    comment: "Initial income",
    amount: 25000,
    balanceAfter: 25000,
    categoryId: "063f1132-ba5d-42b4-951d-44011ca46262",
    userId: "2655e40b-9ffe-49a5-8e23-a8a85fff3e87",
  },
  {
    id: "cab59ce7-faf2-46ce-b2a5-9cc21445ccd5",
    transactionDate: "2022-05-12",
    type: "EXPENSE",
    comment: "Firing JAvelin",
    amount: -500,
    balanceAfter: 24500,
    categoryId: "3acd0ecd-5295-4d54-8e7c-d3908f4d0402",
    userId: "2655e40b-9ffe-49a5-8e23-a8a85fff3e87",
  },
  {
    id: "8f116979-d893-4e84-9279-322d2cdd25bc",
    transactionDate: "2022-05-12",
    type: "EXPENSE",
    comment: "NLAW training",
    amount: -1500,
    balanceAfter: 23000,
    categoryId: "1272fcc4-d59f-462d-ad33-a85a075e5581",
    userId: "2655e40b-9ffe-49a5-8e23-a8a85fff3e87",
  },
  {
    id: "fe7983de-19a9-4d8e-9d76-8849acacb696",
    transactionDate: "2022-05-12",
    type: "EXPENSE",
    comment: "New uniform",
    amount: -1000,
    balanceAfter: 22000,
    categoryId: "bbdd58b8-e804-4ab9-bf4f-695da5ef64f4",
    userId: "2655e40b-9ffe-49a5-8e23-a8a85fff3e87",
  },
];
const category = [
  {
    id: "c9d9e447-1b83-4238-8712-edc77b18b739",
    name: "Main expenses",
    type: "EXPENSE",
  },
  {
    id: "27eb4b75-9a42-4991-a802-4aefe21ac3ce",
    name: "Products",
    type: "EXPENSE",
  },
  {
    id: "3caa7ba0-79c0-40b9-ae1f-de1af1f6e386",
    name: "Car",
    type: "EXPENSE",
  },
  {
    id: "bbdd58b8-e804-4ab9-bf4f-695da5ef64f4",
    name: "Self care",
    type: "EXPENSE",
  },
  {
    id: "76cc875a-3b43-4eae-8fdb-f76633821a34",
    name: "Child care",
    type: "EXPENSE",
  },
  {
    id: "128673b5-2f9a-46ae-a428-ec48cf1effa1",
    name: "Household products",
    type: "EXPENSE",
  },
  {
    id: "1272fcc4-d59f-462d-ad33-a85a075e5581",
    name: "Education",
    type: "EXPENSE",
  },
  {
    id: "c143130f-7d1e-4011-90a4-54766d4e308e",
    name: "Leisure",
    type: "EXPENSE",
  },
  {
    id: "719626f1-9d23-4e99-84f5-289024e437a8",
    name: "Other expenses",
    type: "EXPENSE",
  },
  {
    id: "3acd0ecd-5295-4d54-8e7c-d3908f4d0402",
    name: "Entertainment",
    type: "EXPENSE",
  },
  {
    id: "063f1132-ba5d-42b4-951d-44011ca46262",
    name: "Income",
    type: "INCOME",
  },
];

const HomeTab = () => {
  return (
    <div>
      <NewTable data={arr} categories={category} />
    </div>
  );
};
export default HomeTab;
