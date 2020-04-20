// import npm
import { connect } from 'react-redux';

// import
import Admin from 'src/components/Admin';
import {
  increaseMinute,
  decreaseMinute,
  changeServiceStatus,
  refreshTime,
} from 'src/actions/user';
import {
  changeTicketInputValue,
  subscribeToWaitingList,
  confirmCurrentTicket,
  cancelCurrentTicket,
  modalTicketAdd,
} from 'src/actions/ticket';

const mapStateToProps = (state) => ({
  status: state.user.restaurantProfileEditInput.status,
  averageEatingTime: state.user.restaurantProfileEditInput.averageEatingTime,
  tickets: state.user.restaurantTicketsData,
  loadingTicketsData: state.user.loadingTickets,
  currentTime: state.user.currentTime,
  currentTicket: state.tickets.currentTicket,

  // ticket add (modal)
  lastName: state.tickets.ticketInscriptionInput.lastName,
  firstName: state.tickets.ticketInscriptionInput.firstName,
  email: state.tickets.ticketInscriptionInput.email,
  phone: state.tickets.ticketInscriptionInput.phone,
  cutlery: state.tickets.ticketInscriptionInput.cutlery,
  errors: state.tickets.ticketSubscriptionErrors[0],
});

const mapDispatchToProps = (dispatch) => ({
  handleDecreaseMinute: () => {
    dispatch(decreaseMinute());
  },
  handleIncreaseMinute: () => {
    dispatch(increaseMinute());
  },
  handleChangeServiceStatus: () => {
    dispatch(changeServiceStatus());
  },
  refreshTime: () => {
    dispatch(refreshTime());
  },
  cancelCurrentTicket: () => {
    dispatch(cancelCurrentTicket());
  },  
  confirmCurrentTicket: () => {
    dispatch(confirmCurrentTicket());
  },

  // ticket add (modal)
  changeTicketInputValue: (newValue, fieldName) => {
    dispatch(changeTicketInputValue(newValue, fieldName));
  },
  handleTicketSubscribe: () => {
    dispatch(modalTicketAdd());
  },
});

// export
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Admin);
