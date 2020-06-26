import React, {Component} from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';

class DishDetail extends Component {
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
            <li>
              --
              {' '}
              {cmt.author}
              {' '}
              ,
              {' '}
              {new Intl.DateTimeFormat ('en-US', {
                year: 'numeric',
                month: 'short',
                day: '2-digit',
              }).format (new Date (Date.parse (cmt.date)))}
            </li>
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
      <div className="contianer">
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            {this.renderDish (this.props.dish)}
          </div>
          {this.renderComment (this.props.dish)}
        </div>
      </div>
    );
  }
}

export default DishDetail;
