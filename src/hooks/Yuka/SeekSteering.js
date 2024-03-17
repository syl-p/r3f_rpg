import * as YUKA from "yuka"
export default function useSeekSteering(targetRef, obstacles = []) {
    const vehicle = new YUKA.Vehicle()
    const target = new YUKA.GameEntity()
    const entityManager = new YUKA.EntityManager()

    function sync(entity, renderComponent) {
        renderComponent.matrix.copy(entity.worldMatrix)
    }

    function set(bodyRef, initialPosition) {
        if(bodyRef.current && targetToFollow.current) {
            bodyRef.geometry.computeBoundingSphere()
            vehicle.setRenderComponent(bodyRef, sync)

            vehicle.boundingRadius = bodyRef.geometry.boundingSphere.radius
            vehicle.smoother = new YUKA.Smoother(30)

            entityManager.add(vehicle)
            target.setRenderComponent(targetToFollow.current, sync)
            entityManager.add(target)

            const seekBehavior = new YUKA.ArriveBehavior(target.position, 4, 2)

            vehicle.steering.add(seekBehavior)
            vehicle.position.set(initialPosition.x, initialPosition.y, initialPosition.z)
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
        }
    }

    function update(delta) {
        if(bodyRef.current && targetToFollow.current) {
            entityManager.update(delta)
        }
    }

    return [set, update]
}