import React, {Component} from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';

class DishDetail extends Component {
  constructor (props) {
    super (props);
  }

  renderDish (dish) {
    if (dish != null) {
      return (
        <Card>
          <CardImg top src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      );
    } else return <div />;
  }

  renderComment (dish) {
    if (dish == null) {
      return <div />;
    }
    const comment = dish.comments.map (cmt => {
      return (
        <div key={cmt.id}>
          <ul className="list-unstyled">
            <li>{cmt.comment}</li>
            <li>-- {cmt.author} , {cmt.date}</li>
          </ul>
        </div>
      );
    });
    return (
      <div className="col-12 col-md-5 m-1">
        <h4>Comments</h4>
        {comment}
      </div>
    );
  }

  render () {
    return (
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          {this.renderDish (this.props.selectedDish)}
        </div>
        {this.renderComment (this.props.selectedDish)}
      </div>
    );
  }
}

export default DishDetail;
