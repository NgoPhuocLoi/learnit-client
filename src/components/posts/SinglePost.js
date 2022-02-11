import React from "react";
import { Badge, Card, Col, Row } from "react-bootstrap";
import ActionButtons from "./ActionButtons";

function SinglePost({ post: { _id, title, status, description, url } }) {
  return (
    <Card
      className="shadow"
      border={
        status === "LEARNED"
          ? "success"
          : status === "TO LEARN"
          ? "warning"
          : "danger"
      }
    >
      <Card.Body>
        <Card.Title>
          <Row>
            <Col>
              <p className="post-title">{title}</p>
              <Badge
                pill
                bg={
                  status === "LEARNED"
                    ? "success"
                    : status === "TO LEARN"
                    ? "warning"
                    : "danger"
                }
              >
                {status}
              </Badge>
            </Col>
            <Col className="text-end">
              <ActionButtons
                url={url}
                id={_id}
                description={description}
                title={title}
              />
            </Col>
          </Row>
        </Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default SinglePost;
