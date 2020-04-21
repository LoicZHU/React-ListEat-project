import { connect } from 'react-redux';

import Confirmation from 'src/components/Confirmation';

const mapStateToProps = (state) => ({
  ticketId: state.tickets.ticketId,
  ticketCutlery: state.tickets.ticketCutlery,
  ticketWaitingTime: state.tickets.ticketWaitingTime,
});

const mapDispatchToProps = () => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Confirmation);
