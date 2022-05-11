import React from 'react';
import { Card, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import PLACEHOLDER_IMG from '../../../assets/img/placeholder.png';

const DESCRIPTION_LIMIT = 80;

interface Props {
  flight_number?: string;
  mission_patch_img?: string;
  mission_name?: string;
  details?: string;
  launch_year?: string;
  rocket_name?: string;
  rocket_type?: string;
}

const Launch = ({
  flight_number,
  mission_patch_img,
  mission_name,
  details,
  launch_year,
  rocket_name,
  rocket_type,
}: Props): JSX.Element => {
  return (
    <Card className="text-white bg-dark">
      <Card.Header className="font-weight-bold text-danger fs-6">
        Flight no: {!!flight_number && flight_number}
      </Card.Header>
      <Card.Body className="py-2">
        <Card.Img
          variant="top"
          src={mission_patch_img ? mission_patch_img : PLACEHOLDER_IMG}
          style={{ height: 100, width: 100 }}
        />

        <Card.Title className="font-weight-bold mt-4 text-warning" style={{ height: 40 }}>
          {!!mission_name && mission_name}
        </Card.Title>
        <Card.Text className="fs-6 font-weight-light">
          <p style={{ height: '80px' }}>
            {!!details && details?.length < DESCRIPTION_LIMIT
              ? details
              : `${details?.substring(0, DESCRIPTION_LIMIT)} ...`}
          </p>
          <p className="text-danger">Launched At {!!launch_year && launch_year}</p>
          <Col className="pb-4">
            <span className=" text-warning">Rocket: </span>
            <span className=" text-warning">
              {!!rocket_name && rocket_name}-{!!rocket_type && rocket_type}
            </span>
          </Col>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Launch;
