const { sequelizeErrorCatcher } = require("./Error")
const moment = require('moment');
const NUMERATOR_LEN = 8

async function Getnumerator(willCreatenew, next) {
    try {
        const nums = await db.filenumeratorModel.findAll()
        if (nums && Array.isArray(nums) && nums.length > 0) {
            const previous = nums[0]
            if (willCreatenew) {
                await db.filenumeratorModel.update({
                    Current: Createnewnumerator(previous.Current, next)
                }, { where: { Id: previous.Id } })
            } else {

            }
        } else {
            await db.filenumeratorModel.create({
                Current: Createnewnumerator(_, next)
            })
            return
        }
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
}

async function Getcurrent() {
    const nums = await db.filenumeratorModel.findAll()
    if (nums && Array.isArray(nums) && nums.length > 0) {
}

async function Createnewnumerator(previous, next) {
    try {
        const currentDate = moment();
        const year = currentDate.format('YY');
        const month = currentDate.format('MM');
        if (previous && previous.length === NUMERATOR_LEN) {
            const previousYear = previous.slice(0, 2);
            const previousMonth = previous.slice(2, 4);
            const previousCount = parseInt(previous.slice(4), 10);
            let count;
            if (previousYear === year && previousMonth === month) {
                count = previousCount + 1;
            } else {
                count = 1
            }
            const numerator = year + month + count.toString().padStart(4, '0');
            return numerator
        } else {
            const count = 1
            const numerator = year + month + count.toString().padStart(4, '0')
            return numerator
        }
    } catch (error) {
        return next(sequelizeErrorCatcher(error))
    }
}

