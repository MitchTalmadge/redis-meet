import { useContext, useId, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { AVContext } from "../../contexts/av/av";
import styles from './device-picker.module.scss';

export const DevicePicker = () => {
  const id = useId();
  const { devices } = useContext(AVContext);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>("");

  return (
    <div className={styles['device-picker']}>
      <Form>
        <Row>
          <Col>
            <Form.Group controlId={`${id}-camera-picker`}>
              <Form.Label>Camera</Form.Label>
              <Form.Select>
                {devices.cameras.some(d => d.deviceId === "") || (
                  <option value="">Default</option>
                )}
                {devices.cameras.map(camera => (
                  <option key={camera.deviceId} value={camera.deviceId}>{camera.deviceId === "" ? "Default" : camera.label}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </div>
  )
}