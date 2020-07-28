import {Container, interfaces} from 'inversify';
import {allContainers} from './allContainers';

export class ContainerFactory {
    static config(): interfaces.Container {
        let currentContainer: interfaces.Container = new Container();
        allContainers.map(container => {
            currentContainer = Container.merge(currentContainer, container);
        });
        return currentContainer;
    }
}
