import React, {Component} from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Label,
} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';

const required = val => val && val.length;
const maxLength = len => val => !val || val.length <= len;
const minLength = len => val => val && val.length >= len;

class CommentForm extends Component {
  constructor (props) {
    super (props);
    this.state = {
      isModalOpen: false,
    };

    this.toggleModal = this.toggleModal.bind (this);
    this.handleSubmit = this.handleSubmit.bind (this);
  }

  toggleModal () {
    this.setState ({
      isModalOpen: !this.state.isModalOpen,
    });
  }
  handleSubmit (values) {
    this.setState ({
      isModalOpen: !this.state.isModalOpen,
    });

    console.log ('Current State is: ' + JSON.stringify (values));
    alert ('Current State is: ' + JSON.stringify (values));
  }

  render () {
    return (
      <div>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-pencil fa-lg" /> Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={values => this.handleSubmit (values)}>
              <Row className="form-group">
                <Label htmlFor="contactType" md={12}>Rating</Label>
                <Col md={12}>
                  <Control.select
                    model=".contactType"
                    name="contactType"
                    className="form-control"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="yourname" md={12}>Your Name</Label>
                <Col md={12}>
                  <Control.text
                    model=".yourname"
                    id="yourname"
                    name="yourname"
                    placeholder="Your Name"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength (3),
                      maxLength: maxLength (15),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".yourname"
                    show="touched"
                    messages={{
                      required: 'Required',
                      minLength: 'Must be greater than 2 characters',
                      maxLength: 'Must be 15 characters or less',
                    }}
                  />
                </Col>
              </Row>

              <Row className="form-group">
                <Label htmlFor="comment" md={12}>Comment</Label>
                <Col md={12}>
                  <Control.textarea
                    model=".comment"
                    id="comment"
                    name="comment"
                    rows="6"
                    className="form-control"
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={10}>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

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

function RenderComments({comments}) {
  if (comments == null) {
    return <div />;
  }
  const comm = comments.map (cmt => {
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
      <CommentForm />
    </div>
  );
}

const DishDetail = props => {
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>

          <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
          <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{props.dish.name}</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          <RenderDish dish={props.dish} />
        </div>

        <RenderComments comments={props.comments} />

      </div>
    </div>
  );
};

export default DishDetail;
