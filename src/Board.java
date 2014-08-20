import java.util.Collections;
import java.util.HashSet;
import java.util.LinkedList;


public class Board {

	private int cell;

	private int length;

	private int[][] grid;


	public static void main(String[] args){

		Board b = new Board(6);

		//				System.out.println(b.checkGrid(new int[][]{{3,4,4,1},
		//						{2,1,2,3},
		//						{2,4,1,3},
		//						{1,3,4,2}}
		//						, true));


	}

	/**
	 * Constructor
	 * @param size The length of a cell
	 */
	public Board(int size){
		//		this.cell = size;
		//		this.length = cell * cell;

		this.length = size;
		this.cell = (int)Math.sqrt(length);
		if (cell*cell != length){
			//Not a perfect square
			cell = -length;
		}

		grid = new int[length][length];

		generateBoard();

		System.out.println(this);

		//		System.out.println(checkGrid(grid,true));
	}

	public int[][] getGrid(){
		return grid;
	}


	public void generateBoard(){
		if (!fillGrid(grid, 0,0)){
			System.out.println("No valid board can be made");
		}

		//		convertBoard();

	}

	/**
	 * Tries to fill a grid in a way that follows the rules of sudoku
	 * @param grid
	 * @param r
	 * @param c
	 * @return Whether the attempt was successful
	 */
	private boolean fillGrid(int[][] grid, int r, int c){

		//		System.out.println("r: " + r + " c: " + c);

		if (!checkGrid(grid, false)){
			return false;
		}

		if (c >= length){
			c = 0;
			r++;
		}

		if (r >= length){
			if ( checkGrid(grid, true)){
				this.grid = grid;
				return true;
			} else {
				return false;
			}
		}

		LinkedList<Integer> numbers = new LinkedList<Integer>();
		for (int i = 1; i <= length; i++) {
			numbers.add(i);
		}

		//A random order of numbers allows different boards to be made
		Collections.shuffle(numbers);

		int[][] newGrid = cloneArray(grid);

		while(!numbers.isEmpty()){

			int n = numbers.remove();

			newGrid[r][c] = (char)n;

			if (fillGrid(newGrid,r,c+1)){
				return true;
			}


		}
		return false;
	}

	/**
	 * Checks if blocks in a zig-zag formation are unique.
	 * In other words, the zig-zag shape replaces the traditional 'cells'
	 * @param grid
	 * @return Whether the cells contain unique numbers
	 */
	private boolean checkStrangeRegion(int[][] grid){

		HashSet<Integer>[] digits = (HashSet<Integer>[])new HashSet[4];
		for (int i = 0; i < digits.length; i++) {
			digits[i] = new HashSet<Integer>();
		}

		int count = 0;

		for (int a = 0; a < length; a++) {
			for (int b = 0; b <= a; b++) {	
				System.out.println("a:"+a+" b:"+b);
				count++;
				if (count > length){
					System.out.println("strange true");
					return true;
				}
				int n;
				n = grid[0 + b][0 + a];				
				if (n > 0)
					if (! digits[0].add(n)){
						return false;
					} else if (n > length){
						return false;
					}

				n = grid[0 + a][length-1 - b];		
				if (n > 0)
					if (! digits[1].add(n)){
						return false;
					} else if (n > length){
						return false;
					}
				n = grid[length-1 - b][length-1 - a];		
				if (n > 0)
					if (! digits[2].add(n)){
						return false;
					} else if (n > length){
						return false;
					}
				n = grid[length-1 - a][0 + b];		
				if (n > 0)
					if (! digits[3].add(n)){
						return false;
					} else if (n > length){
						return false;
					}

			}
		}

		return true;


	}

	private boolean checkGrid(int[][] grid, boolean complete){

		if (complete){
			//Check for 0's
			for (int i = 0; i < grid.length; i++) {
				for (int j = 0; j < grid.length; j++) {
					if (grid[i][j] == 0)
						return false;
				}
			}
		}


		//Check rows and columns
		for (int i = 0; i < grid.length; i++) {

			if (!checkRegion(grid, i,0,1, length)){
				return false;
			}
			if (!checkRegion(grid, 0,i,length, 1)){
				return false;
			}

		}

		//Check cells
		if (cell > 0){
			for (int i = 0; i < cell; i++) {
				for (int j = 0; j < cell; j++) {				
					if (!checkRegion(grid, i*cell,j*cell,cell, cell)){
						return false;
					}
				}
			}
		} 
		else {
			if (!checkStrangeRegion(grid)){
				return false;
			}
		}
		//Check diagonals, maybe? NVM no valid solution


		return true;

	}

	private boolean checkRegion(int[][] grid, int x, int y, int dx, int dy){

		HashSet<Integer> digits = new HashSet<Integer>(length);

		for (int a = 0; a < dx; a++) {
			for (int b = 0; b < dy; b++) {				
				int n = grid[x + a][y + b];

				if (n > 0){
					if (! digits.add(n)){
						return false;
					} else if (n > length){
						return false;
					}
				}
			}
		}

		return true;
	}

	private char[][] toChar(){

		char[][] arr = new char[length][length];

		int change;
		if (length < 10){
			change = '0';
		} else {
			change = 'A';
		}

		for (int i = 0; i < grid.length; i++) {
			for (int j = 0; j < grid[0].length; j++) {
				arr[i][j] = (char) (grid[i][j] + change);
			}
		}

		return arr;
	}

	private int[][] cloneArray(int[][] arr){

		int[][] newArr = new int[length][length];

		for (int i = 0; i < newArr.length; i++) {
			newArr[i] = arr[i].clone();
		}

		return newArr;

	}

	public String toString(){
		String s = "";

		int stringLength = 0;

		char[][] grid = toChar();

		for (int i = 0; i < grid.length; i++) {
			for (int j = 0; j < grid[0].length; j++) {

				if (j % cell == 0){
					s += "| ";
				}
				s += grid[i][j] + " ";

			}
			s += "| ";
			s += "\n";
			if (i==0){
				stringLength = s.length()-2;}

			if ((i+1) % cell == 0){
				for (int j = 0; j < stringLength; j++) {
					s += "-";
				}
				s += "\n";
			}

		}

		//Make a border at the top
		s = "\n" + s;
		for (int j = 0; j < stringLength; j++) {
			s = "-" + s;
		}
		s += "\n";

		return s;


	}

}
