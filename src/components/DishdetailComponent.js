import React from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';

function RenderDish({dish}) {
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

function RenderComment({comment}) {
  if (comment == null) {
    return <div />;
  }
  const comm = comment.comments.map (cmt => {
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
      {comm}
    </div>
  );
}

const DishDetail = props => {
  return (
    <div className="contianer">
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          <RenderDish dish={props.dish} />
        </div>
        <RenderComment comment={props.dish} />
      </div>
    </div>
  );
};

export default DishDetail;
