/**
 * Class implements bidirectional non-circular linked list
 */
class LinkedList {
    constructor(first, last) {
        this.first = first;
        this.last = last || this.first;
    }

    [Symbol.iterator]() {
        let value = undefined;
        return {
            next: () => {
                value = value ? value.next : this.first;
                return {value: value, done: value === undefined};
            }
        };
    };

    /**
     * Return number of elements in the list
     * @returns {number}
     */
    get size() {
        let counter = 0;
        for (let edge of this) {
            counter++;
        }
        return counter;
    }

    /**
     * Return array of elements from first to last
     * @returns {Array}
     */
    toArray() {
        let elements = [];
        for (let element of this) {
            elements.push(element);
        }
        return elements;
    }


    /**
     * Append new element to the end of the list
     * @param element
     * @returns {LinkedList}
     */
    append(element) {
        if (this.isEmpty()) {
            this.first = element;
        } else {
            element.prev = this.last;
            this.last.next = element;
        }

        // update edge to be last
        this.last = element;

        // nullify non-circular links
        this.last.next = undefined;
        this.first.prev = undefined;
        return this;
    }

    /**
     * Insert new element to the list after elementBefore
     * @param newElement
     * @param elementBefore
     * @returns {LinkedList}
     */
    insert(newElement, elementBefore) {
        if (this.isEmpty()) {
            this.first = newElement;
            this.last = newElement;
        } else {
            /* set links to new element */
            let elementAfter = elementBefore.next;
            elementBefore.next = newElement;
            if (elementAfter) elementAfter.prev = newElement;

            /* set links from new element */
            newElement.prev = elementBefore;
            newElement.next = elementAfter;

            /* extend list if new element added after the last element */
            if (this.last === elementBefore)
                this.last = newElement;
        }
        // nullify non-circular links
        this.last.next = undefined;
        this.first.prev = undefined;
        return this;
    }

    /**
     * Remove element from the list
     * @param element
     * @returns {LinkedList}
     */
    remove(element) {
        // special case if last edge removed
        if (element === this.first && element === this.last) {
            this.first = undefined;
            this.last = undefined;
        } else {
            // update linked list
            if (element.prev) element.prev.next = element.next;
            if (element.next) element.next.prev = element.prev;
            // update first if need
            if (element === this.first) {
                this.first = element.next;
            }
            // update last if need
            if (element === this.last) {
                this.last = element.prev;
            }
        }
        return this;
    }

    /**
     * Return true if list is empty
     * @returns {boolean}
     */
    isEmpty() {
        return this.first === undefined;
    }

}

export default LinkedList;