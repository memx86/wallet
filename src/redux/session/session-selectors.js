export const tokenSelector = (state) => state.session.token;
export const isAuthSelector = (state) => state.session.isAuth;
export const isLogoutSelector = (state) => state.session.isLogout;
export const isTransactionModalSelector = (state) =>
  state.session.isTransactionModal;
export const isEditModalSelector = (state) => state.session.isEditModal;
