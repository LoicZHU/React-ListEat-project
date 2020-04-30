// import npm
import { connect } from 'react-redux';

// import
import Admin from 'src/components/Admin';
import {
  increaseMinute,
  decreaseMinute,
  changeServiceStatus,
  refreshTime,
  fetchTicketsData,
  handleMobileClockClick,
} from 'src/actions/user';

import {
  changeTicketInputValue,
  confirmCurrentTicket,
  cancelCurrentTicket,
  modalTicketAdd,
  showModalTicketForm,
  showModalTicketValidation,
  modalTicketValidate,
  handleModalTicketCancel,
  showModalEmailError,
  showModalErrors,
  handleClearModalForm,
} from 'src/actions/ticket';

const mapStateToProps = (state) => ({
  restaurantId: state.user.restaurantId,
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
  showModalTicketValidation: state.tickets.ticketInscriptionInput.showModalTicketValidation,
  estimatedEntryTime: state.tickets.ticketInscriptionInput.estimatedEntryTime,
  modalErrors: state.tickets.ticketInscriptionInput.errors.modal,
  emailError: state.tickets.ticketInscriptionInput.errors.email,

  // show elements 
  mobileClockClickState: state.user.showElements.mobileTimeEstimation,
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

  handleShowModalTicketForm: () => {
    dispatch(showModalTicketForm());
  },

  handleShowModalTicketValidation: () => {
    dispatch(showModalTicketValidation());
  },

  handleModalTicketValidate: () => {
    dispatch(modalTicketValidate());
  },

  handleModalTicketCancel: () => {
    dispatch(handleModalTicketCancel());
  },

  showModalErrors: () => {
    dispatch(showModalErrors());
  },

  showModalEmailError: () => {
    dispatch(showModalEmailError());
  },

  handleClearModalForm: () => {
    dispatch(handleClearModalForm());
  },

  fetchTicketsData: () => {
    dispatch(fetchTicketsData());
  },

  handleMobileClockClick: (newValue) => {
    dispatch(handleMobileClockClick(newValue));
  }

});

// export
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Admin);
