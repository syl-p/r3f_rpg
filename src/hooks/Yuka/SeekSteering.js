import * as YUKA from "yuka"
import {useEffect, useState} from "react";
import * as THREE from "three";
export default function useSeekSteering(body, targetBody, initialPosition = new THREE.Vector3(), obstacles = []) {
    const [vehicle] = useState(new YUKA.Vehicle());
    const [target] = useState(new YUKA.GameEntity());
    const [entityManager] = useState(new YUKA.EntityManager());

    useEffect(() => {
        if (!body.current || !targetBody) {
            return; // Ne rien faire si body ou targetBody n'est pas défini
        }

        body.current.geometry.computeBoundingSphere()
        body.current.matrixAutoUpdate = false
        vehicle.setRenderComponent(body.current, sync)

        vehicle.boundingRadius = body.current.geometry.boundingSphere.radius
        vehicle.smoother = new YUKA.Smoother(30)

        entityManager.add(vehicle)

        target.setRenderComponent(targetBody, sync)
        entityManager.add(target)

        const seekBehavior = new YUKA.ArriveBehavior(targetBody.position, 4, 2)
        vehicle.steering.add(seekBehavior)
        vehicle.position.set(initialPosition.x, initialPosition.y, initialPosition.z)

        // Obstacle behavior
        const obstaclesEntities = []
        obstacles.forEach((obstacle) => {
            obstacle.geometry.computeBoundingSphere()
            const obstacleEntity = new YUKA.GameEntity()

            // @ts-ignore
            obstacleEntity.position.copy(obstacle.position)

            obstacleEntity.boundingRadius = obstacle.geometry.boundingSphere?.radius
            obstaclesEntities.push(obstacleEntity)
        })

        const obstacleAvoidanceBehavior = new YUKA.ObstacleAvoidanceBehavior(obstaclesEntities)
        vehicle.steering.add(obstacleAvoidanceBehavior)

        return () => {
            entityManager.clear();
        };
    }, [body, targetBody, obstacles]);

    function sync(entity, renderComponent) {
        renderComponent.matrix.copy(entity.worldMatrix)
    }

    function update(delta) {
        entityManager.update(delta * 1.5)
    }

    return [update]
}